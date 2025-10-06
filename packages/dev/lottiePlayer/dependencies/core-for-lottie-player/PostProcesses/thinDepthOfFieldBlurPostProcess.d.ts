import type { Nullable, AbstractEngine, EffectWrapperCreationOptions, Vector2 } from "core-for-lottie-player/index.js";
import { ThinBlurPostProcess } from "./thinBlurPostProcess.js";
/**
 * @internal
 */
export declare class ThinDepthOfFieldBlurPostProcess extends ThinBlurPostProcess {
    constructor(name: string, engine: Nullable<AbstractEngine> | undefined, direction: Vector2, kernel: number, options?: EffectWrapperCreationOptions);
}
