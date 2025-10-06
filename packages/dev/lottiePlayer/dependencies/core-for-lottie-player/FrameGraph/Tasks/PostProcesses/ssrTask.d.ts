import type { FrameGraph, FrameGraphRenderPass, Camera, FrameGraphTextureHandle } from "core-for-lottie-player/index.js";
import { FrameGraphPostProcessTask } from "./postProcessTask.js";
import { ThinSSRPostProcess } from "core-for-lottie-player/PostProcesses/thinSSRPostProcess.js";
/**
 * @internal
 */
export declare class FrameGraphSSRTask extends FrameGraphPostProcessTask {
    normalTexture: FrameGraphTextureHandle;
    depthTexture: FrameGraphTextureHandle;
    reflectivityTexture: FrameGraphTextureHandle;
    backDepthTexture?: FrameGraphTextureHandle;
    camera: Camera;
    readonly postProcess: ThinSSRPostProcess;
    constructor(name: string, frameGraph: FrameGraph, thinPostProcess?: ThinSSRPostProcess);
    record(skipCreationOfDisabledPasses?: boolean): FrameGraphRenderPass;
}
