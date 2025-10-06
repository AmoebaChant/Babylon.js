import { ThinWebGPUEngine } from "core-for-lottie-player/Engines/thinWebGPUEngine.js";
import { InternalTexture } from "../../../Materials/Textures/internalTexture.js";
import { Constants } from "../../constants.js";
ThinWebGPUEngine.prototype.createRenderTargetCubeTexture = function (size, options) {
    const rtWrapper = this._createHardwareRenderTargetWrapper(false, true, size);
    const fullOptions = {
        generateMipMaps: true,
        generateDepthBuffer: true,
        generateStencilBuffer: false,
        type: Constants.TEXTURETYPE_UNSIGNED_BYTE,
        samplingMode: Constants.TEXTURE_TRILINEAR_SAMPLINGMODE,
        format: Constants.TEXTUREFORMAT_RGBA,
        samples: 1,
        ...options,
    };
    fullOptions.generateStencilBuffer = fullOptions.generateDepthBuffer && fullOptions.generateStencilBuffer;
    rtWrapper.label = fullOptions.label ?? "RenderTargetWrapper";
    rtWrapper._generateDepthBuffer = fullOptions.generateDepthBuffer;
    rtWrapper._generateStencilBuffer = fullOptions.generateStencilBuffer;
    const texture = new InternalTexture(this, 5 /* InternalTextureSource.RenderTarget */);
    texture.width = size;
    texture.height = size;
    texture.depth = 0;
    texture.isReady = true;
    texture.isCube = true;
    texture.samples = fullOptions.samples;
    texture.generateMipMaps = fullOptions.generateMipMaps;
    texture.samplingMode = fullOptions.samplingMode;
    texture.type = fullOptions.type;
    texture.format = fullOptions.format;
    this._internalTexturesCache.push(texture);
    rtWrapper.setTextures(texture);
    if (rtWrapper._generateDepthBuffer || rtWrapper._generateStencilBuffer) {
        rtWrapper.createDepthStencilTexture(0, fullOptions.samplingMode === undefined ||
            fullOptions.samplingMode === Constants.TEXTURE_BILINEAR_SAMPLINGMODE ||
            fullOptions.samplingMode === Constants.TEXTURE_LINEAR_LINEAR ||
            fullOptions.samplingMode === Constants.TEXTURE_TRILINEAR_SAMPLINGMODE ||
            fullOptions.samplingMode === Constants.TEXTURE_LINEAR_LINEAR_MIPLINEAR ||
            fullOptions.samplingMode === Constants.TEXTURE_NEAREST_LINEAR_MIPNEAREST ||
            fullOptions.samplingMode === Constants.TEXTURE_NEAREST_LINEAR_MIPLINEAR ||
            fullOptions.samplingMode === Constants.TEXTURE_NEAREST_LINEAR ||
            fullOptions.samplingMode === Constants.TEXTURE_LINEAR_LINEAR_MIPNEAREST, rtWrapper._generateStencilBuffer, rtWrapper.samples);
    }
    if (options && options.createMipMaps && !fullOptions.generateMipMaps) {
        texture.generateMipMaps = true;
    }
    this._textureHelper.createGPUTextureForInternalTexture(texture);
    if (options && options.createMipMaps && !fullOptions.generateMipMaps) {
        texture.generateMipMaps = false;
    }
    return rtWrapper;
};
//# sourceMappingURL=engine.renderTargetCube.js.map