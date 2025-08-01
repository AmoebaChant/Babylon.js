import { NodeMaterialBlockConnectionPointTypes } from "../../Enums/nodeMaterialBlockConnectionPointTypes";
import type { NodeMaterialBuildState } from "../../nodeMaterialBuildState";
import type { NodeMaterialConnectionPoint } from "../../nodeMaterialBlockConnectionPoint";
import { NodeMaterialConnectionPointDirection } from "../../nodeMaterialBlockConnectionPoint";
import { NodeMaterialBlockTargets } from "../../Enums/nodeMaterialBlockTargets";
import type { NodeMaterial, NodeMaterialDefines } from "../../nodeMaterial";
import { RegisterClass } from "../../../../Misc/typeStore";
import { NodeMaterialConnectionPointCustomObject } from "../../nodeMaterialConnectionPointCustomObject";
import { ReflectionTextureBaseBlock } from "../Dual/reflectionTextureBaseBlock";
import type { Nullable } from "../../../../types";
import { Texture } from "../../../Textures/texture";
import type { BaseTexture } from "../../../Textures/baseTexture";
import type { Mesh } from "../../../../Meshes/mesh";
import type { SubMesh } from "../../../../Meshes/subMesh";
import type { Effect } from "../../../effect";
import { editableInPropertyPage, PropertyTypeForEdition } from "../../../../Decorators/nodeDecorator";
import type { Scene } from "../../../../scene";
import { Logger } from "core/Misc/logger";
import { ShaderLanguage } from "core/Materials/shaderLanguage";

/**
 * Block used to implement the reflection module of the PBR material
 */
export class ReflectionBlock extends ReflectionTextureBaseBlock {
    /** @internal */
    public _defineLODReflectionAlpha: string;
    /** @internal */
    public _defineLinearSpecularReflection: string;
    private _vEnvironmentIrradianceName: string;
    /** @internal */
    public _vReflectionMicrosurfaceInfosName: string;
    /** @internal */
    public _vReflectionInfosName: string;
    /** @internal */
    public _vReflectionFilteringInfoName: string;
    private _scene: Scene;
    private _iblIntensityName: string;

    /**
     * The properties below are set by the main PBR block prior to calling methods of this class.
     * This is to avoid having to add them as inputs here whereas they are already inputs of the main block, so already known.
     * It's less burden on the user side in the editor part.
     */

    /** @internal */
    public worldPositionConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    public worldNormalConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    public cameraPositionConnectionPoint: NodeMaterialConnectionPoint;
    /** @internal */
    public viewConnectionPoint: NodeMaterialConnectionPoint;

    /**
     * Defines if the material uses spherical harmonics vs spherical polynomials for the
     * diffuse part of the IBL.
     */
    @editableInPropertyPage("Spherical Harmonics", PropertyTypeForEdition.Boolean, "ADVANCED", { embedded: true, notifiers: { update: true } })
    public useSphericalHarmonics: boolean = true;

    /**
     * Force the shader to compute irradiance in the fragment shader in order to take bump in account.
     */
    @editableInPropertyPage("Force irradiance in fragment", PropertyTypeForEdition.Boolean, "ADVANCED", { embedded: true, notifiers: { update: true } })
    public forceIrradianceInFragment: boolean = false;

    protected override _onGenerateOnlyFragmentCodeChanged(): boolean {
        if (this.position.isConnected) {
            this.generateOnlyFragmentCode = !this.generateOnlyFragmentCode;
            Logger.Error("The position input must not be connected to be able to switch!");
            return false;
        }

        this._setTarget();

        return true;
    }

    protected override _setTarget(): void {
        super._setTarget();
        this.getInputByName("position")!.target = this.generateOnlyFragmentCode ? NodeMaterialBlockTargets.Fragment : NodeMaterialBlockTargets.Vertex;
        if (this.generateOnlyFragmentCode) {
            this.forceIrradianceInFragment = true;
        }
    }

    /**
     * Create a new ReflectionBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name);

        this._isUnique = true;

        this.registerInput("position", NodeMaterialBlockConnectionPointTypes.AutoDetect, false, NodeMaterialBlockTargets.Vertex);
        this.registerInput("world", NodeMaterialBlockConnectionPointTypes.Matrix, false, NodeMaterialBlockTargets.Vertex);
        this.registerInput("color", NodeMaterialBlockConnectionPointTypes.Color3, true, NodeMaterialBlockTargets.Fragment);

        this.registerOutput(
            "reflection",
            NodeMaterialBlockConnectionPointTypes.Object,
            NodeMaterialBlockTargets.Fragment,
            new NodeMaterialConnectionPointCustomObject("reflection", this, NodeMaterialConnectionPointDirection.Output, ReflectionBlock, "ReflectionBlock")
        );

        this.position.addExcludedConnectionPointFromAllowedTypes(
            NodeMaterialBlockConnectionPointTypes.Color3 | NodeMaterialBlockConnectionPointTypes.Vector3 | NodeMaterialBlockConnectionPointTypes.Vector4
        );
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "ReflectionBlock";
    }

    /**
     * Gets the position input component
     */
    public get position(): NodeMaterialConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the world position input component
     */
    public get worldPosition(): NodeMaterialConnectionPoint {
        return this.worldPositionConnectionPoint;
    }

    /**
     * Gets the world normal input component
     */
    public get worldNormal(): NodeMaterialConnectionPoint {
        return this.worldNormalConnectionPoint;
    }

    /**
     * Gets the world input component
     */
    public get world(): NodeMaterialConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the camera (or eye) position component
     */
    public get cameraPosition(): NodeMaterialConnectionPoint {
        return this.cameraPositionConnectionPoint;
    }

    /**
     * Gets the view input component
     */
    public get view(): NodeMaterialConnectionPoint {
        return this.viewConnectionPoint;
    }

    /**
     * Gets the color input component
     */
    public get color(): NodeMaterialConnectionPoint {
        return this._inputs[2];
    }

    /**
     * Gets the reflection object output component
     */
    public get reflection(): NodeMaterialConnectionPoint {
        return this._outputs[0];
    }

    /**
     * Returns true if the block has a texture (either its own texture or the environment texture from the scene, if set)
     */
    public get hasTexture(): boolean {
        return !!this._getTexture();
    }

    /**
     * Gets the reflection color (either the name of the variable if the color input is connected, else a default value)
     */
    public get reflectionColor(): string {
        return this.color.isConnected ? this.color.associatedVariableName : "vec3(1., 1., 1.)";
    }

    protected override _getTexture(): Nullable<BaseTexture> {
        if (this.texture) {
            return this.texture;
        }

        return this._scene.environmentTexture;
    }

    public override prepareDefines(defines: NodeMaterialDefines) {
        super.prepareDefines(defines);

        const reflectionTexture = this._getTexture();
        const reflection = reflectionTexture && reflectionTexture.getTextureMatrix;

        defines.setValue("REFLECTION", reflection, true);

        if (!reflection) {
            return;
        }

        defines.setValue(this._defineLODReflectionAlpha, reflectionTexture.lodLevelInAlpha, true);
        defines.setValue(this._defineLinearSpecularReflection, reflectionTexture.linearSpecularLOD, true);
        defines.setValue(this._defineOppositeZ, this._scene.useRightHandedSystem ? !reflectionTexture.invertZ : reflectionTexture.invertZ, true);

        defines.setValue("SPHERICAL_HARMONICS", this.useSphericalHarmonics, true);
        defines.setValue("GAMMAREFLECTION", reflectionTexture.gammaSpace, true);
        defines.setValue("RGBDREFLECTION", reflectionTexture.isRGBD, true);

        if (reflectionTexture && reflectionTexture.coordinatesMode !== Texture.SKYBOX_MODE) {
            if (reflectionTexture.isCube) {
                defines.setValue("USESPHERICALFROMREFLECTIONMAP", true);
                defines.setValue("USEIRRADIANCEMAP", false);
                if (this.forceIrradianceInFragment || this._scene.getEngine().getCaps().maxVaryingVectors <= 8) {
                    defines.setValue("USESPHERICALINVERTEX", false);
                } else {
                    defines.setValue("USESPHERICALINVERTEX", true);
                }
            }
        }
    }

    public override bind(effect: Effect, nodeMaterial: NodeMaterial, mesh?: Mesh, subMesh?: SubMesh) {
        super.bind(effect, nodeMaterial, mesh);

        const reflectionTexture = this._getTexture();

        if (!reflectionTexture || !subMesh) {
            return;
        }

        if (reflectionTexture.isCube) {
            effect.setTexture(this._cubeSamplerName, reflectionTexture);
        } else {
            effect.setTexture(this._2DSamplerName, reflectionTexture);
        }

        effect.setFloat(this._iblIntensityName, this._scene.iblIntensity * reflectionTexture.level);

        const width = reflectionTexture.getSize().width;

        effect.setFloat3(this._vReflectionMicrosurfaceInfosName, width, reflectionTexture.lodGenerationScale, reflectionTexture.lodGenerationOffset);
        effect.setFloat2(this._vReflectionFilteringInfoName, width, Math.log2(width));

        const defines = subMesh.materialDefines as NodeMaterialDefines;

        const polynomials = reflectionTexture.sphericalPolynomial;
        if (defines.USESPHERICALFROMREFLECTIONMAP && polynomials) {
            if (defines.SPHERICAL_HARMONICS) {
                const preScaledHarmonics = polynomials.preScaledHarmonics;
                effect.setVector3("vSphericalL00", preScaledHarmonics.l00);
                effect.setVector3("vSphericalL1_1", preScaledHarmonics.l1_1);
                effect.setVector3("vSphericalL10", preScaledHarmonics.l10);
                effect.setVector3("vSphericalL11", preScaledHarmonics.l11);
                effect.setVector3("vSphericalL2_2", preScaledHarmonics.l2_2);
                effect.setVector3("vSphericalL2_1", preScaledHarmonics.l2_1);
                effect.setVector3("vSphericalL20", preScaledHarmonics.l20);
                effect.setVector3("vSphericalL21", preScaledHarmonics.l21);
                effect.setVector3("vSphericalL22", preScaledHarmonics.l22);
            } else {
                effect.setFloat3("vSphericalX", polynomials.x.x, polynomials.x.y, polynomials.x.z);
                effect.setFloat3("vSphericalY", polynomials.y.x, polynomials.y.y, polynomials.y.z);
                effect.setFloat3("vSphericalZ", polynomials.z.x, polynomials.z.y, polynomials.z.z);
                effect.setFloat3("vSphericalXX_ZZ", polynomials.xx.x - polynomials.zz.x, polynomials.xx.y - polynomials.zz.y, polynomials.xx.z - polynomials.zz.z);
                effect.setFloat3("vSphericalYY_ZZ", polynomials.yy.x - polynomials.zz.x, polynomials.yy.y - polynomials.zz.y, polynomials.yy.z - polynomials.zz.z);
                effect.setFloat3("vSphericalZZ", polynomials.zz.x, polynomials.zz.y, polynomials.zz.z);
                effect.setFloat3("vSphericalXY", polynomials.xy.x, polynomials.xy.y, polynomials.xy.z);
                effect.setFloat3("vSphericalYZ", polynomials.yz.x, polynomials.yz.y, polynomials.yz.z);
                effect.setFloat3("vSphericalZX", polynomials.zx.x, polynomials.zx.y, polynomials.zx.z);
            }
        }
    }

    /**
     * Gets the code to inject in the vertex shader
     * @param state current state of the node material building
     * @returns the shader code
     */
    public override handleVertexSide(state: NodeMaterialBuildState): string {
        let code = super.handleVertexSide(state);
        const isWebGPU = state.shaderLanguage === ShaderLanguage.WGSL;

        state._emitFunctionFromInclude("harmonicsFunctions", `//${this.name}`, {
            replaceStrings: [
                { search: /uniform vec3 vSphericalL00;[\s\S]*?uniform vec3 vSphericalL22;/g, replace: "" },
                { search: /uniform vec3 vSphericalX;[\s\S]*?uniform vec3 vSphericalZX;/g, replace: "" },
            ],
        });

        const reflectionVectorName = state._getFreeVariableName("reflectionVector");

        this._vEnvironmentIrradianceName = state._getFreeVariableName("vEnvironmentIrradiance");

        state._emitVaryingFromString(
            this._vEnvironmentIrradianceName,
            NodeMaterialBlockConnectionPointTypes.Vector3,
            "defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)"
        );

        state._emitUniformFromString("vSphericalL00", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL1_1", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL10", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL11", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL2_2", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL2_1", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL20", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL21", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");
        state._emitUniformFromString("vSphericalL22", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS");

        state._emitUniformFromString("vSphericalX", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalY", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalZ", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalXX_ZZ", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalYY_ZZ", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalZZ", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalXY", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalYZ", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);
        state._emitUniformFromString("vSphericalZX", NodeMaterialBlockConnectionPointTypes.Vector3, "SPHERICAL_HARMONICS", true);

        code += `#if defined(USESPHERICALFROMREFLECTIONMAP) && defined(USESPHERICALINVERTEX)
                ${state._declareLocalVar(reflectionVectorName, NodeMaterialBlockConnectionPointTypes.Vector3)} = (${(isWebGPU ? "uniforms." : "") + this._reflectionMatrixName} * vec4${state.fSuffix}(normalize(${this.worldNormal.associatedVariableName}).xyz, 0)).xyz;
                #ifdef ${this._defineOppositeZ}
                    ${reflectionVectorName}.z *= -1.0;
                #endif
                ${isWebGPU ? "vertexOutputs." : ""}${this._vEnvironmentIrradianceName} = computeEnvironmentIrradiance(${reflectionVectorName});
            #endif\n`;

        return code;
    }

    /**
     * Gets the main code of the block (fragment side)
     * @param state current state of the node material building
     * @param normalVarName name of the existing variable corresponding to the normal
     * @returns the shader code
     */
    public getCode(state: NodeMaterialBuildState, normalVarName: string): string {
        let code = "";

        this.handleFragmentSideInits(state);
        const isWebGPU = state.shaderLanguage === ShaderLanguage.WGSL;

        state._emitFunctionFromInclude("harmonicsFunctions", `//${this.name}`, {
            replaceStrings: [
                { search: /uniform vec3 vSphericalL00;[\s\S]*?uniform vec3 vSphericalL22;/g, replace: "" },
                { search: /uniform vec3 vSphericalX;[\s\S]*?uniform vec3 vSphericalZX;/g, replace: "" },
            ],
        });

        if (!isWebGPU) {
            state._emitFunction(
                "sampleReflection",
                `
                #ifdef ${this._define3DName}
                    #define sampleReflection(s, c) textureCube(s, c)
                #else
                    #define sampleReflection(s, c) texture2D(s, c)
                #endif\n`,
                `//${this.name}`
            );

            state._emitFunction(
                "sampleReflectionLod",
                `
                #ifdef ${this._define3DName}
                    #define sampleReflectionLod(s, c, l) textureCubeLodEXT(s, c, l)
                #else
                    #define sampleReflectionLod(s, c, l) texture2DLodEXT(s, c, l)
                #endif\n`,
                `//${this.name}`
            );
        }

        const computeReflectionCoordsFunc = isWebGPU
            ? `
            fn computeReflectionCoordsPBR(worldPos: vec4f, worldNormal: vec3f) -> vec3f {
                ${this.handleFragmentSideCodeReflectionCoords(state, "worldNormal", "worldPos", true, true)}
                return ${this._reflectionVectorName};
            }\n`
            : `
            vec3 computeReflectionCoordsPBR(vec4 worldPos, vec3 worldNormal) {
                ${this.handleFragmentSideCodeReflectionCoords(state, "worldNormal", "worldPos", true, true)}
                return ${this._reflectionVectorName};
            }\n`;

        state._emitFunction("computeReflectionCoordsPBR", computeReflectionCoordsFunc, `//${this.name}`);

        this._vReflectionMicrosurfaceInfosName = state._getFreeVariableName("vReflectionMicrosurfaceInfos");

        state._emitUniformFromString(this._vReflectionMicrosurfaceInfosName, NodeMaterialBlockConnectionPointTypes.Vector3);

        this._vReflectionInfosName = state._getFreeVariableName("vReflectionInfos");

        this._vReflectionFilteringInfoName = state._getFreeVariableName("vReflectionFilteringInfo");

        state._emitUniformFromString(this._vReflectionFilteringInfoName, NodeMaterialBlockConnectionPointTypes.Vector2);

        this._iblIntensityName = state._getFreeVariableName("iblIntensity");

        state._emitUniformFromString(this._iblIntensityName, NodeMaterialBlockConnectionPointTypes.Float);

        code += `#ifdef REFLECTION
            ${state._declareLocalVar(this._vReflectionInfosName, NodeMaterialBlockConnectionPointTypes.Vector2)} = vec2${state.fSuffix}(${(isWebGPU ? "uniforms." : "") + this._iblIntensityName}, 0.);

            ${isWebGPU ? "var reflectionOut: reflectionOutParams" : "reflectionOutParams reflectionOut"};

            reflectionOut = reflectionBlock(
                ${this.generateOnlyFragmentCode ? this._worldPositionNameInFragmentOnlyMode : (isWebGPU ? "input." : "") + "v_" + this.worldPosition.associatedVariableName}.xyz
                , ${normalVarName}
                , alphaG
                , ${(isWebGPU ? "uniforms." : "") + this._vReflectionMicrosurfaceInfosName}
                , ${this._vReflectionInfosName}
                , ${this.reflectionColor}
            #ifdef ANISOTROPIC
                ,anisotropicOut
            #endif
            #if defined(${this._defineLODReflectionAlpha}) && !defined(${this._defineSkyboxName})
                ,NdotVUnclamped
            #endif
            #ifdef ${this._defineLinearSpecularReflection}
                , roughness
            #endif
            #ifdef ${this._define3DName}
                , ${this._cubeSamplerName}
                ${isWebGPU ? `, ${this._cubeSamplerName}Sampler` : ""}
            #else
                , ${this._2DSamplerName}
                ${isWebGPU ? `, ${this._2DSamplerName}Sampler` : ""}
            #endif
            #if defined(NORMAL) && defined(USESPHERICALINVERTEX)
                , ${isWebGPU ? "input." : ""}${this._vEnvironmentIrradianceName}
            #endif
            #if (defined(USESPHERICALFROMREFLECTIONMAP) && (!defined(NORMAL) || !defined(USESPHERICALINVERTEX))) || (defined(USEIRRADIANCEMAP) && defined(REFLECTIONMAP_3D))
                    , ${this._reflectionMatrixName}
            #endif
            #ifdef USEIRRADIANCEMAP
                , irradianceSampler         // ** not handled **
                ${isWebGPU ? `, irradianceSamplerSampler` : ""}
                #ifdef USE_IRRADIANCE_DOMINANT_DIRECTION
                , vReflectionDominantDirection
                #endif
            #endif
            #ifndef LODBASEDMICROSFURACE
                #ifdef ${this._define3DName}
                    , ${this._cubeSamplerName}
                    ${isWebGPU ? `, ${this._cubeSamplerName}Sampler` : ""}
                    , ${this._cubeSamplerName}
                    ${isWebGPU ? `, ${this._cubeSamplerName}Sampler` : ""}
                #else
                    , ${this._2DSamplerName}
                    ${isWebGPU ? `, ${this._2DSamplerName}Sampler` : ""}
                    , ${this._2DSamplerName}                    
                    ${isWebGPU ? `, ${this._2DSamplerName}Sampler` : ""}
                #endif
            #endif
            #ifdef REALTIME_FILTERING
                , ${this._vReflectionFilteringInfoName}
                #ifdef IBL_CDF_FILTERING
                    , icdfSampler         // ** not handled **
                    ${isWebGPU ? `, icdfSamplerSampler` : ""}
                #endif
            #endif
            , viewDirectionW
            , diffuseRoughness
            , surfaceAlbedo
            );
        #endif\n`;

        return code;
    }

    protected override _buildBlock(state: NodeMaterialBuildState) {
        this._scene = state.sharedData.scene;

        if (state.target !== NodeMaterialBlockTargets.Fragment) {
            this._defineLODReflectionAlpha = state._getFreeDefineName("LODINREFLECTIONALPHA");
            this._defineLinearSpecularReflection = state._getFreeDefineName("LINEARSPECULARREFLECTION");
        }

        return this;
    }

    protected override _dumpPropertiesCode() {
        let codeString = super._dumpPropertiesCode();

        if (this.texture) {
            codeString += `${this._codeVariableName}.texture.gammaSpace = ${this.texture.gammaSpace};\n`;
        }
        codeString += `${this._codeVariableName}.useSphericalHarmonics = ${this.useSphericalHarmonics};\n`;
        codeString += `${this._codeVariableName}.forceIrradianceInFragment = ${this.forceIrradianceInFragment};\n`;

        return codeString;
    }

    public override serialize(): any {
        const serializationObject = super.serialize();

        serializationObject.useSphericalHarmonics = this.useSphericalHarmonics;
        serializationObject.forceIrradianceInFragment = this.forceIrradianceInFragment;
        serializationObject.gammaSpace = this.texture?.gammaSpace ?? true;

        return serializationObject;
    }

    public override _deserialize(serializationObject: any, scene: Scene, rootUrl: string) {
        super._deserialize(serializationObject, scene, rootUrl);

        this.useSphericalHarmonics = serializationObject.useSphericalHarmonics;
        this.forceIrradianceInFragment = serializationObject.forceIrradianceInFragment;
        if (this.texture) {
            this.texture.gammaSpace = serializationObject.gammaSpace;
        }
    }
}

RegisterClass("BABYLON.ReflectionBlock", ReflectionBlock);
