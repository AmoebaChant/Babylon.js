import type { FrameGraph, FrameGraphTextureHandle, FrameGraphRenderPass } from "core-for-lottie-player/index.js";
import { ThinBloomMergePostProcess } from "core-for-lottie-player/PostProcesses/thinBloomMergePostProcess.js";
import { FrameGraphPostProcessTask } from "./postProcessTask.js";
/**
 * @internal
 */
export declare class FrameGraphBloomMergeTask extends FrameGraphPostProcessTask {
    blurTexture: FrameGraphTextureHandle;
    readonly postProcess: ThinBloomMergePostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinBloomMergePostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
