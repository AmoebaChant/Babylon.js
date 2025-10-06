import { Texture } from "../Materials/Textures/texture.js";
import { PostProcess } from "./postProcess.js";
import { Constants } from "../Engines/constants.js";
import { Logger } from "../Misc/logger.js";
import "../Shaders/imageProcessing.fragment.js";
import "../Shaders/subSurfaceScattering.fragment.js";
import "../Shaders/postprocess.vertex.js";
import "../ShadersWGSL/imageProcessing.fragment.js";
import "../ShadersWGSL/subSurfaceScattering.fragment.js";
import "../ShadersWGSL/postprocess.vertex.js";
/**
 * Sub surface scattering post process
 */
export class SubSurfaceScatteringPostProcess extends PostProcess {
    /**
     * Gets a string identifying the name of the class
     * @returns "SubSurfaceScatteringPostProcess" string
     */
    getClassName() {
        return "SubSurfaceScatteringPostProcess";
    }
    constructor(name, scene, options, camera = null, samplingMode, engine, reusable, textureType = Constants.TEXTURETYPE_UNSIGNED_BYTE) {
        const localOptions = {
            uniforms: ["texelSize", "viewportSize", "metersPerUnit"],
            samplers: ["diffusionS", "diffusionD", "filterRadii", "irradianceSampler", "depthSampler", "albedoSampler"],
            size: typeof options === "number" ? options : undefined,
            camera,
            samplingMode,
            engine,
            reusable,
            textureType,
            ...options,
            blockCompilation: true,
        };
        super(name, "subSurfaceScattering", { ...localOptions, samplingMode: samplingMode || Texture.BILINEAR_SAMPLINGMODE });
        this._scene = scene;
        this.updateEffect();
        this.onApplyObservable.add((effect) => {
            if (!scene.prePassRenderer || !scene.subSurfaceConfiguration) {
                Logger.Error("PrePass and subsurface configuration needs to be enabled for subsurface scattering.");
                return;
            }
            const texelSize = this.texelSize;
            effect.setFloat("metersPerUnit", scene.subSurfaceConfiguration.metersPerUnit);
            effect.setFloat2("texelSize", texelSize.x, texelSize.y);
            effect.setTexture("irradianceSampler", scene.prePassRenderer.getRenderTarget().textures[scene.prePassRenderer.getIndex(Constants.PREPASS_IRRADIANCE_TEXTURE_TYPE)]);
            effect.setTexture("depthSampler", scene.prePassRenderer.getRenderTarget().textures[scene.prePassRenderer.getIndex(Constants.PREPASS_DEPTH_TEXTURE_TYPE)]);
            effect.setTexture("albedoSampler", scene.prePassRenderer.getRenderTarget().textures[scene.prePassRenderer.getIndex(Constants.PREPASS_ALBEDO_SQRT_TEXTURE_TYPE)]);
            effect.setFloat2("viewportSize", Math.tan(scene.activeCamera.fov / 2) * scene.getEngine().getAspectRatio(scene.activeCamera, true), Math.tan(scene.activeCamera.fov / 2));
            effect.setArray3("diffusionS", scene.subSurfaceConfiguration.ssDiffusionS);
            effect.setArray("diffusionD", scene.subSurfaceConfiguration.ssDiffusionD);
            effect.setArray("filterRadii", scene.subSurfaceConfiguration.ssFilterRadii);
        });
    }
}
//# sourceMappingURL=subSurfaceScatteringPostProcess.js.map