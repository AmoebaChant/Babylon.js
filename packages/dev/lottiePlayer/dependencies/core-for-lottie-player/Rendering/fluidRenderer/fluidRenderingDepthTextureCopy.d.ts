import type { AbstractEngine } from "core-for-lottie-player/Engines/abstractEngine.js";
import type { RenderTargetWrapper } from "core-for-lottie-player/Engines/renderTargetWrapper.js";
import type { InternalTexture } from "core-for-lottie-player/Materials/Textures/internalTexture.js";
/** @internal */
export declare class FluidRenderingDepthTextureCopy {
    private _engine;
    private _depthRTWrapper;
    private _copyTextureToTexture;
    get depthRTWrapper(): RenderTargetWrapper;
    constructor(engine: AbstractEngine, width: number, height: number, samples?: number);
    copy(source: InternalTexture): boolean;
    dispose(): void;
}
