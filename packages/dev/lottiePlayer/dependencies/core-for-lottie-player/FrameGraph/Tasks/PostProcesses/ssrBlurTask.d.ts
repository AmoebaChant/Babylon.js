import type { FrameGraph, FrameGraphRenderPass, FrameGraphRenderContext } from "core-for-lottie-player/index.js";
import { FrameGraphPostProcessTask } from "./postProcessTask.js";
import { ThinSSRBlurPostProcess } from "core-for-lottie-player/PostProcesses/thinSSRBlurPostProcess.js";
/**
 * @internal
 */
export declare class FrameGraphSSRBlurTask extends FrameGraphPostProcessTask {
    readonly postProcess: ThinSSRBlurPostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinSSRBlurPostProcess);
    record(skipCreationOfDisabledPasses?: boolean, additionalExecute?: (context: FrameGraphRenderContext) => void, additionalBindings?: (context: FrameGraphRenderContext) => void): FrameGraphRenderPass;
}
