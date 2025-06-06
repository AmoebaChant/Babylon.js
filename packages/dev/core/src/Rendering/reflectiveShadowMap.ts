/**
 * Reflective Shadow Maps were first described in http://www.klayge.org/material/3_12/GI/rsm.pdf by Carsten Dachsbacher and Marc Stamminger
 * The ReflectiveShadowMap class only implements the position / normal / flux texture generation part.
 * For the global illumination effect, see the GIRSMManager class.
 */
import { Constants } from "core/Engines/constants";
import { MultiRenderTarget } from "core/Materials/Textures/multiRenderTarget";
import type { UniformBuffer } from "core/Materials/uniformBuffer";
import { Color3, Color4 } from "core/Maths/math.color";
import { Matrix, TmpVectors } from "core/Maths/math.vector";
import type { AbstractMesh } from "core/Meshes/abstractMesh";
import type { Scene } from "core/scene";
import type { WebGPURenderTargetWrapper } from "core/Engines/WebGPU/webgpuRenderTargetWrapper";
import { MaterialPluginBase } from "core/Materials/materialPluginBase";
import type { Material } from "core/Materials/material";
import type { StandardMaterial } from "core/Materials/standardMaterial";
import { MaterialDefines } from "core/Materials/materialDefines";
import type { SpotLight } from "core/Lights/spotLight";
import { PBRBaseMaterial } from "core/Materials/PBR/pbrBaseMaterial";
import { expandToProperty, serialize } from "core/Misc/decorators";
import { RegisterClass } from "core/Misc/typeStore";
import { Light } from "core/Lights/light";
import type { DirectionalLight } from "core/Lights/directionalLight";
import { ShaderLanguage } from "core/Materials/shaderLanguage";
import type { Nullable } from "core/types";

/**
 * Class used to generate the RSM (Reflective Shadow Map) textures for a given light.
 * The textures are: position (in world space), normal (in world space) and flux (light intensity)
 */
export class ReflectiveShadowMap {
    private _scene: Scene;
    private _light: DirectionalLight | SpotLight;
    private _lightTransformMatrix: Matrix = Matrix.Identity();
    private _mrt: MultiRenderTarget;
    private _textureDimensions: { width: number; height: number };
    private _regularMatToMatWithPlugin: Map<Material, Material>;
    private _counters: Array<{ name: string; value: number }>;

    private _enable = false;

    /**
     * Enables or disables the RSM generation.
     */
    public get enable() {
        return this._enable;
    }

    public set enable(value: boolean) {
        if (this._enable === value) {
            return;
        }

        this._enable = value;
        this._customRenderTarget(value);
    }

    /**
     * Gets the position texture generated by the RSM process.
     */
    public get positionWorldTexture() {
        return this._mrt.textures[0];
    }

    /**
     * Gets the normal texture generated by the RSM process.
     */
    public get normalWorldTexture() {
        return this._mrt.textures[1];
    }

    /**
     * Gets the flux texture generated by the RSM process.
     */
    public get fluxTexture() {
        return this._mrt.textures[2];
    }

    /**
     * Gets the render list used to generate the RSM textures.
     */
    public get renderList() {
        return this._mrt.renderList;
    }

    /**
     * Gets the light used to generate the RSM textures.
     */
    public get light() {
        return this._light;
    }

    /**
     * Gets or sets a boolean indicating if the light parameters should be recomputed even if the light parameters (position, direction) did not change.
     * You should not set this value to true, except for debugging purpose (if you want to see changes from the inspector, for eg).
     * Instead, you should call updateLightParameters() explicitely at the right time (once the light parameters changed).
     */
    public forceUpdateLightParameters = false;

    /**
     * Creates a new RSM for the given light.
     * @param scene The scene
     * @param light The light to use to generate the RSM textures
     * @param textureDimensions The dimensions of the textures to generate. Default: \{ width: 512, height: 512 \}
     */
    constructor(scene: Scene, light: DirectionalLight | SpotLight, textureDimensions = { width: 512, height: 512 }) {
        this._scene = scene;
        this._light = light;
        this._textureDimensions = textureDimensions;
        this._regularMatToMatWithPlugin = new Map();
        this._counters = [{ name: "RSM Generation " + light.name, value: 0 }];

        this._createMultiRenderTarget();
        this._recomputeLightTransformationMatrix();

        this.enable = true;
    }

    /**
     * Sets the dimensions of the textures to generate.
     * @param dimensions The dimensions of the textures to generate.
     */
    public setTextureDimensions(dimensions: { width: number; height: number }) {
        const renderList = this._mrt.renderList;

        this._textureDimensions = dimensions;
        this._disposeMultiRenderTarget();
        this._createMultiRenderTarget();

        if (renderList) {
            for (const mesh of renderList) {
                this._addMeshToMRT(mesh);
            }
        }
    }

    /**
     * Adds the given mesh to the render list used to generate the RSM textures.
     * @param mesh The mesh to add to the render list used to generate the RSM textures. If not provided, all scene meshes will be added to the render list.
     */
    public addMesh(mesh?: AbstractMesh) {
        if (mesh) {
            this._addMeshToMRT(mesh);
        } else {
            for (const mesh of this._scene.meshes) {
                this._addMeshToMRT(mesh);
            }
        }
        this._recomputeLightTransformationMatrix();
    }

    /**
     * Recomputes the light transformation matrix. Call this method if you manually changed the light position / direction / etc. and you want to update the RSM textures accordingly.
     * You should also call this method if you add/remove meshes to/from the render list.
     */
    public updateLightParameters() {
        this._recomputeLightTransformationMatrix();
    }

    /**
     * Gets the light transformation matrix used to generate the RSM textures.
     */
    public get lightTransformationMatrix() {
        if (this.forceUpdateLightParameters) {
            this.updateLightParameters();
        }
        return this._lightTransformMatrix;
    }

    /**
     * Gets the GPU time spent to generate the RSM textures.
     */
    public get countersGPU(): Array<{ name: string; value: number }> {
        return this._counters;
    }

    /**
     * Disposes the RSM.
     */
    public dispose() {
        this._disposeMultiRenderTarget();
    }

    protected _createMultiRenderTarget() {
        const name = this._light.name;

        const caps = this._scene.getEngine().getCaps();

        const fluxTextureType = caps.rg11b10ufColorRenderable ? Constants.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV : Constants.TEXTURETYPE_HALF_FLOAT;
        const fluxTextureFormat = caps.rg11b10ufColorRenderable ? Constants.TEXTUREFORMAT_RGB : Constants.TEXTUREFORMAT_RGBA;

        this._mrt = new MultiRenderTarget(
            "RSMmrt_" + name,
            this._textureDimensions,
            3, // number of RTT - position / normal / flux
            this._scene,
            {
                types: [Constants.TEXTURETYPE_HALF_FLOAT, Constants.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV, fluxTextureType],
                samplingModes: [Constants.TEXTURE_BILINEAR_SAMPLINGMODE, Constants.TEXTURE_BILINEAR_SAMPLINGMODE, Constants.TEXTURE_BILINEAR_SAMPLINGMODE],
                generateMipMaps: false,
                targetTypes: [Constants.TEXTURE_2D, Constants.TEXTURE_2D, Constants.TEXTURE_2D],
                formats: [Constants.TEXTUREFORMAT_RGBA, Constants.TEXTUREFORMAT_RGBA, fluxTextureFormat],
            },
            ["RSMPosition_" + name, "RSMNormal_" + name, "RSMFlux_" + name]
        );

        this._mrt.renderList = [];
        this._mrt.clearColor = new Color4(0, 0, 0, 1);
        this._mrt.noPrePassRenderer = true;

        let sceneUBO: UniformBuffer;
        let currentSceneUBO: UniformBuffer;

        const useUBO = this._scene.getEngine().supportsUniformBuffers;

        if (useUBO) {
            sceneUBO = this._scene.createSceneUniformBuffer(`Scene for RSM (light "${name}")`);
        }

        let shadowEnabled: boolean;

        this._mrt.onBeforeBindObservable.add(() => {
            currentSceneUBO = this._scene.getSceneUniformBuffer();
            shadowEnabled = this._light.shadowEnabled;
            this._light.shadowEnabled = false; // we render from the light point of view, so we won't have any shadow anyway!
        });

        this._mrt.onBeforeRenderObservable.add((faceIndex: number) => {
            if (sceneUBO) {
                this._scene.setSceneUniformBuffer(sceneUBO);
            }
            const viewMatrix = this._light.getViewMatrix(faceIndex);
            const projectionMatrix = this._light.getProjectionMatrix(viewMatrix || undefined, this._mrt.renderList || undefined);
            if (viewMatrix && projectionMatrix) {
                this._scene.setTransformMatrix(viewMatrix, projectionMatrix);
            }
            if (useUBO) {
                this._scene.getSceneUniformBuffer().unbindEffect();
                this._scene.finalizeSceneUbo();
            }
        });

        this._mrt.onAfterUnbindObservable.add(() => {
            if (sceneUBO) {
                this._scene.setSceneUniformBuffer(currentSceneUBO);
            }
            this._scene.updateTransformMatrix(); // restore the view/projection matrices of the active camera
            this._light.shadowEnabled = shadowEnabled;
            this._counters[0].value = (this._mrt.renderTarget as WebGPURenderTargetWrapper).gpuTimeInFrame?.counter.lastSecAverage ?? 0;
        });

        this._customRenderTarget(true);
    }

    protected _customRenderTarget(add: boolean) {
        const idx = this._scene.customRenderTargets.indexOf(this._mrt);
        if (add) {
            if (idx === -1) {
                this._scene.customRenderTargets.push(this._mrt);
            }
        } else if (idx !== -1) {
            this._scene.customRenderTargets.splice(idx, 1);
        }
    }

    protected _recomputeLightTransformationMatrix() {
        const viewMatrix = this._light.getViewMatrix();
        const projectionMatrix = this._light.getProjectionMatrix(viewMatrix || undefined, this._mrt.renderList || undefined);
        if (viewMatrix && projectionMatrix) {
            viewMatrix.multiplyToRef(projectionMatrix, this._lightTransformMatrix);
        }
    }

    protected _addMeshToMRT(mesh: AbstractMesh) {
        this._mrt.renderList?.push(mesh);

        const material = mesh.material;
        if (mesh.getTotalVertices() === 0 || !material) {
            return;
        }

        let rsmMaterial = this._regularMatToMatWithPlugin.get(material);
        if (!rsmMaterial) {
            rsmMaterial = material.clone("RSMCreate_" + material.name) || undefined;
            if (rsmMaterial) {
                // Disable the prepass renderer for this material
                Object.defineProperty(rsmMaterial, "canRenderToMRT", {
                    get: function () {
                        return false;
                    },
                    enumerable: true,
                    configurable: true,
                });

                (rsmMaterial as any).disableLighting = true;

                const rsmCreatePlugin = new RSMCreatePluginMaterial(rsmMaterial);

                rsmCreatePlugin.isEnabled = true;
                rsmCreatePlugin.light = this._light;

                this._regularMatToMatWithPlugin.set(material, rsmMaterial);
            }
        }

        this._mrt.setMaterialForRendering(mesh, rsmMaterial);
    }

    protected _disposeMultiRenderTarget() {
        this._customRenderTarget(false);
        this._mrt.dispose();
    }
}

/**
 * @internal
 */
class MaterialRSMCreateDefines extends MaterialDefines {
    public RSMCREATE = false;
    public RSMCREATE_PROJTEXTURE = false;
    public RSMCREATE_LIGHT_IS_SPOT = false;
}

/**
 * Plugin that implements the creation of the RSM textures
 */
export class RSMCreatePluginMaterial extends MaterialPluginBase {
    private _varAlbedoName: string;
    private _lightColor = new Color3();
    private _hasProjectionTexture = false;

    /**
     * Defines the name of the plugin.
     */
    public static readonly Name = "RSMCreate";

    /**
     * Defines the light that should be used to generate the RSM textures.
     */
    @serialize()
    public light: DirectionalLight | SpotLight;

    private _isEnabled = false;
    /**
     * Defines if the plugin is enabled in the material.
     */
    @serialize()
    @expandToProperty("_markAllSubMeshesAsTexturesDirty")
    public isEnabled = false;

    protected _markAllSubMeshesAsTexturesDirty(): void {
        this._enable(this._isEnabled);
        this._internalMarkAllSubMeshesAsTexturesDirty();
    }

    private _internalMarkAllSubMeshesAsTexturesDirty: () => void;

    /**
     * Gets a boolean indicating that the plugin is compatible with a give shader language.
     * @returns true if the plugin is compatible with the shader language
     */
    public override isCompatible(): boolean {
        return true;
    }

    /**
     * Create a new RSMCreatePluginMaterial
     * @param material Parent material of the plugin
     */
    constructor(material: Material | StandardMaterial | PBRBaseMaterial) {
        super(material, RSMCreatePluginMaterial.Name, 300, new MaterialRSMCreateDefines());

        this._internalMarkAllSubMeshesAsTexturesDirty = material._dirtyCallbacks[Constants.MATERIAL_TextureDirtyFlag];

        this._varAlbedoName = material instanceof PBRBaseMaterial ? "surfaceAlbedo" : "baseColor.rgb";
    }

    public override prepareDefines(defines: MaterialRSMCreateDefines) {
        defines.RSMCREATE = this._isEnabled;

        this._hasProjectionTexture = false;

        const isSpot = this.light.getTypeID() === Light.LIGHTTYPEID_SPOTLIGHT;
        if (isSpot) {
            const spot = this.light as SpotLight;
            this._hasProjectionTexture = spot.projectionTexture ? spot.projectionTexture.isReady() : false;
        }

        defines.RSMCREATE_PROJTEXTURE = this._hasProjectionTexture;
        defines.RSMCREATE_LIGHT_IS_SPOT = isSpot;
        defines.SCENE_MRT_COUNT = 3;
    }

    public override getClassName() {
        return "RSMCreatePluginMaterial";
    }

    public override getUniforms() {
        return {
            ubo: [
                { name: "rsmTextureProjectionMatrix", size: 16, type: "mat4" },
                { name: "rsmSpotInfo", size: 4, type: "vec4" },
                { name: "rsmLightColor", size: 3, type: "vec3" },
                { name: "rsmLightPosition", size: 3, type: "vec3" },
            ],
            fragment: `#ifdef RSMCREATE
                    uniform mat4 rsmTextureProjectionMatrix;
                    uniform vec4 rsmSpotInfo;
                    uniform vec3 rsmLightColor;
                    uniform vec3 rsmLightPosition;
                #endif`,
        };
    }

    public override getSamplers(samplers: string[]) {
        samplers.push("rsmTextureProjectionSampler");
    }

    public override bindForSubMesh(uniformBuffer: UniformBuffer) {
        if (!this._isEnabled) {
            return;
        }

        this.light.diffuse.scaleToRef(this.light.getScaledIntensity(), this._lightColor);
        uniformBuffer.updateColor3("rsmLightColor", this._lightColor);

        if (this.light.getTypeID() === Light.LIGHTTYPEID_SPOTLIGHT) {
            const spot = this.light as SpotLight;

            if (this._hasProjectionTexture) {
                uniformBuffer.updateMatrix("rsmTextureProjectionMatrix", spot.projectionTextureMatrix);
                uniformBuffer.setTexture("rsmTextureProjectionSampler", spot.projectionTexture);
            }

            const normalizeDirection = TmpVectors.Vector3[0];

            if (spot.computeTransformedInformation()) {
                uniformBuffer.updateFloat3("rsmLightPosition", this.light.transformedPosition.x, this.light.transformedPosition.y, this.light.transformedPosition.z);
                spot.transformedDirection.normalizeToRef(normalizeDirection);
            } else {
                uniformBuffer.updateFloat3("rsmLightPosition", this.light.position.x, this.light.position.y, this.light.position.z);
                spot.direction.normalizeToRef(normalizeDirection);
            }

            uniformBuffer.updateFloat4("rsmSpotInfo", normalizeDirection.x, normalizeDirection.y, normalizeDirection.z, Math.cos(spot.angle * 0.5));
        }
    }

    public override getCustomCode(shaderType: string, shaderLanguage: ShaderLanguage): Nullable<{ [pointName: string]: string }> {
        if (shaderType === "vertex") {
            return null;
        }
        if (shaderLanguage === ShaderLanguage.WGSL) {
            return {
                // eslint-disable-next-line @typescript-eslint/naming-convention
                CUSTOM_FRAGMENT_DEFINITIONS: `
                #ifdef RSMCREATE
                    #ifdef RSMCREATE_PROJTEXTURE
                        var rsmTextureProjectionSamplerSampler: sampler;
                        var rsmTextureProjectionSampler: texture_2d<f32>;
                    #endif
                #endif
            `,

                // eslint-disable-next-line @typescript-eslint/naming-convention
                CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: `
                #ifdef RSMCREATE
                    var rsmColor = ${this._varAlbedoName} * uniforms.rsmLightColor;
                    #ifdef RSMCREATE_PROJTEXTURE
                    {
                        var strq = uniforms.rsmTextureProjectionMatrix * vec4f(fragmentInputs.vPositionW, 1.0);
                        strq /= strq.w;
                        rsmColor *= textureSample(rsmTextureProjectionSampler, rsmTextureProjectionSamplerSampler, strq.xy).rgb;
                    }
                    #endif
                    #ifdef RSMCREATE_LIGHT_IS_SPOT
                    {
                        var cosAngle = max(0., dot(uniforms.rsmSpotInfo.xyz, normalize(fragmentInputs.vPositionW - uniforms.rsmLightPosition)));
                        rsmColor = sign(cosAngle - uniforms.rsmSpotInfo.w) * rsmColor;
                    }
                    #endif

                    #define MRT_AND_COLOR
                    fragmentOutputs.fragData0 = vec4f(fragmentInputs.vPositionW, 1.);
                    fragmentOutputs.fragData1 = vec4f(normalize(normalW) * 0.5 + 0.5, 1.);
                    fragmentOutputs.fragData2 = vec4f(rsmColor, 1.);
                #endif
            `,
            };
        }

        return {
            // eslint-disable-next-line @typescript-eslint/naming-convention
            CUSTOM_FRAGMENT_BEGIN: `
                #ifdef RSMCREATE
                    #extension GL_EXT_draw_buffers : require
                #endif
            `,

            // eslint-disable-next-line @typescript-eslint/naming-convention
            CUSTOM_FRAGMENT_DEFINITIONS: `
                #ifdef RSMCREATE
                    #ifdef RSMCREATE_PROJTEXTURE
                        uniform highp sampler2D rsmTextureProjectionSampler;                    
                    #endif
                    layout(location = 0) out highp vec4 glFragData[3];
                    vec4 glFragColor;
                #endif
            `,

            // eslint-disable-next-line @typescript-eslint/naming-convention
            CUSTOM_FRAGMENT_BEFORE_FRAGCOLOR: `
                #ifdef RSMCREATE
                    vec3 rsmColor = ${this._varAlbedoName} * rsmLightColor;
                    #ifdef RSMCREATE_PROJTEXTURE
                    {
                        vec4 strq = rsmTextureProjectionMatrix * vec4(vPositionW, 1.0);
                        strq /= strq.w;
                        rsmColor *= texture2D(rsmTextureProjectionSampler, strq.xy).rgb;
                    }
                    #endif
                    #ifdef RSMCREATE_LIGHT_IS_SPOT
                    {
                        float cosAngle = max(0., dot(rsmSpotInfo.xyz, normalize(vPositionW - rsmLightPosition)));
                        rsmColor = sign(cosAngle - rsmSpotInfo.w) * rsmColor;
                    }
                    #endif
                    glFragData[0] = vec4(vPositionW, 1.);
                    glFragData[1] = vec4(normalize(normalW) * 0.5 + 0.5, 1.);
                    glFragData[2] = vec4(rsmColor, 1.);
                #endif
            `,
        };
    }
}

RegisterClass(`BABYLON.RSMCreatePluginMaterial`, RSMCreatePluginMaterial);
