import { AbstractEngine } from "core-for-lottie-player/Engines/abstractEngine.js";
import { Constants } from "../../constants.js";
import "../../AbstractEngine/abstractEngine.alpha.js";
import { ThinWebGPUEngine } from "core-for-lottie-player/Engines/thinWebGPUEngine.js";
ThinWebGPUEngine.prototype.setAlphaMode = function (mode, noDepthWriteChange = false, targetIndex = 0) {
    const alphaBlend = this._alphaState._alphaBlend[targetIndex];
    if (this._alphaMode[targetIndex] === mode && ((mode === Constants.ALPHA_DISABLE && !alphaBlend) || (mode !== Constants.ALPHA_DISABLE && alphaBlend))) {
        if (!noDepthWriteChange) {
            // Make sure we still have the correct depth mask according to the alpha mode (a transparent material could have forced writting to the depth buffer, for instance)
            const depthMask = mode === Constants.ALPHA_DISABLE;
            if (this.depthCullingState.depthMask !== depthMask) {
                this.setDepthWrite(depthMask);
                this._cacheRenderPipeline.setDepthWriteEnabled(depthMask);
            }
        }
        return;
    }
    const alphaBlendDisabled = mode === Constants.ALPHA_DISABLE;
    this._alphaState.setAlphaBlend(!alphaBlendDisabled, targetIndex);
    this._alphaState.setAlphaMode(mode, targetIndex);
    if (!noDepthWriteChange) {
        this.setDepthWrite(alphaBlendDisabled);
        this._cacheRenderPipeline.setDepthWriteEnabled(alphaBlendDisabled);
    }
    this._alphaMode[targetIndex] = mode;
    this._cacheRenderPipeline.setAlphaBlendEnabled(this._alphaState._alphaBlend, this._alphaState._numTargetEnabled);
    this._cacheRenderPipeline.setAlphaBlendFactors(this._alphaState._blendFunctionParameters, this._alphaState._blendEquationParameters);
};
ThinWebGPUEngine.prototype.setAlphaEquation = function (equation, targetIndex = 0) {
    AbstractEngine.prototype.setAlphaEquation.call(this, equation, targetIndex);
    this._cacheRenderPipeline.setAlphaBlendFactors(this._alphaState._blendFunctionParameters, this._alphaState._blendEquationParameters);
};
//# sourceMappingURL=engine.alpha.js.map