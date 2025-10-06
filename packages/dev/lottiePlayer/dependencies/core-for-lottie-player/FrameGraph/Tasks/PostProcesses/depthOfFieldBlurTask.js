import { Constants } from "core-for-lottie-player/Engines/constants.js";
import { FrameGraphBlurTask } from "./blurTask.js";
import { ThinDepthOfFieldBlurPostProcess } from "core-for-lottie-player/PostProcesses/thinDepthOfFieldBlurPostProcess.js";
import { Vector2 } from "core-for-lottie-player/Maths/math.vector.js";
/**
 * @internal
 */
export class FrameGraphDepthOfFieldBlurTask extends FrameGraphBlurTask {
    constructor(name, frameGraph, thinPostProcess) {
        super(name, frameGraph, thinPostProcess || new ThinDepthOfFieldBlurPostProcess(name, frameGraph.engine, new Vector2(1, 0), 10));
        this.circleOfConfusionSamplingMode = Constants.TEXTURE_BILINEAR_SAMPLINGMODE;
        this.onTexturesAllocatedObservable.add((context) => {
            context.setTextureSamplingMode(this.circleOfConfusionTexture, this.circleOfConfusionSamplingMode);
        });
    }
    record(skipCreationOfDisabledPasses = false) {
        if (this.sourceTexture === undefined || this.circleOfConfusionTexture === undefined) {
            throw new Error(`FrameGraphDepthOfFieldBlurTask "${this.name}": sourceTexture and circleOfConfusionTexture are required`);
        }
        const pass = super.record(skipCreationOfDisabledPasses, undefined, (context) => {
            context.bindTextureHandle(this._postProcessDrawWrapper.effect, "circleOfConfusionSampler", this.circleOfConfusionTexture);
        });
        pass.addDependencies(this.circleOfConfusionTexture);
        return pass;
    }
}
//# sourceMappingURL=depthOfFieldBlurTask.js.map