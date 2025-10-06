import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core-for-lottie-player/index.js";
import { FrameGraphBlurTask } from "./blurTask.js";
import { ThinDepthOfFieldBlurPostProcess } from "core-for-lottie-player/PostProcesses/thinDepthOfFieldBlurPostProcess.js";
/**
 * @internal
 */
export declare class FrameGraphDepthOfFieldBlurTask extends FrameGraphBlurTask {
    circleOfConfusionTexture: FrameGraphTextureHandle;
    circleOfConfusionSamplingMode: number;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinDepthOfFieldBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
