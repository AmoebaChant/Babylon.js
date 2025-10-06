import { Constants } from "core-for-lottie-player/Engines/constants.js";
import { FrameGraphPostProcessTask } from "./postProcessTask.js";
import { ThinSSRPostProcess } from "core-for-lottie-player/PostProcesses/thinSSRPostProcess.js";
/**
 * @internal
 */
export class FrameGraphSSRTask extends FrameGraphPostProcessTask {
    constructor(name, frameGraph, thinPostProcess) {
        super(name, frameGraph, thinPostProcess || new ThinSSRPostProcess(name, frameGraph.scene));
        this.onTexturesAllocatedObservable.add((context) => {
            context.setTextureSamplingMode(this.normalTexture, Constants.TEXTURE_BILINEAR_SAMPLINGMODE);
            context.setTextureSamplingMode(this.depthTexture, Constants.TEXTURE_BILINEAR_SAMPLINGMODE);
            context.setTextureSamplingMode(this.reflectivityTexture, Constants.TEXTURE_BILINEAR_SAMPLINGMODE);
            if (this.backDepthTexture) {
                context.setTextureSamplingMode(this.backDepthTexture, Constants.TEXTURE_NEAREST_SAMPLINGMODE);
            }
        });
    }
    record(skipCreationOfDisabledPasses = false) {
        if (this.sourceTexture === undefined ||
            this.normalTexture === undefined ||
            this.depthTexture === undefined ||
            this.reflectivityTexture === undefined ||
            this.camera === undefined) {
            throw new Error(`FrameGraphSSRTask "${this.name}": sourceTexture, normalTexture, depthTexture, reflectivityTexture and camera are required`);
        }
        const pass = super.record(skipCreationOfDisabledPasses, undefined, (context) => {
            this.postProcess.camera = this.camera;
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "normalSampler", this.normalTexture);
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "depthSampler", this.depthTexture);
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "reflectivitySampler", this.reflectivityTexture);
            if (this.backDepthTexture) {
                context.bindTextureHandle(this._postProcessDrawWrapper.effect, "backDepthSampler", this.backDepthTexture);
            }
            if (this.postProcess.enableAutomaticThicknessComputation) {
                this._postProcessDrawWrapper.effect.setFloat("backSizeFactor", 1);
            }
        });
        pass.addDependencies([this.normalTexture, this.depthTexture, this.reflectivityTexture]);
        this.postProcess.textureWidth = this._sourceWidth;
        this.postProcess.textureHeight = this._sourceHeight;
        return pass;
    }
}
//# sourceMappingURL=ssrTask.js.map