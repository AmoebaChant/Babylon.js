import { _WarnImport } from "core-for-lottie-player/Misc/devTools.js";
import { IsDocumentAvailable } from "core-for-lottie-player/Misc/domManagement.js";
import { Constants } from "./constants.js";
export const EngineFunctionContext = {};
/**
 * @internal
 */
export function _ConcatenateShader(source, defines, shaderVersion = "") {
    return shaderVersion + (defines ? defines + "\n" : "") + source;
}
/**
 * @internal
 */
export function _LoadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError, injectedLoadFile) {
    const loadFile = injectedLoadFile || EngineFunctionContext.loadFile;
    if (loadFile) {
        const request = loadFile(url, onSuccess, onProgress, offlineProvider, useArrayBuffer, onError);
        return request;
    }
    throw _WarnImport("FileTools");
}
/**
 * Gets host document
 * @param renderingCanvas if provided, the canvas' owner document will be returned
 * @returns the host document object
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function getHostDocument(renderingCanvas = null) {
    if (renderingCanvas && renderingCanvas.ownerDocument) {
        return renderingCanvas.ownerDocument;
    }
    return IsDocumentAvailable() ? document : null;
}
/** @internal */
export function _GetGlobalDefines(defines, 
// eslint-disable-next-line @typescript-eslint/naming-convention
isNDCHalfZRange, useReverseDepthBuffer, useExactSrgbConversions) {
    if (defines) {
        if (isNDCHalfZRange) {
            defines["IS_NDC_HALF_ZRANGE"] = "";
        }
        else {
            delete defines["IS_NDC_HALF_ZRANGE"];
        }
        if (useReverseDepthBuffer) {
            defines["USE_REVERSE_DEPTHBUFFER"] = "";
        }
        else {
            delete defines["USE_REVERSE_DEPTHBUFFER"];
        }
        if (useExactSrgbConversions) {
            defines["USE_EXACT_SRGB_CONVERSIONS"] = "";
        }
        else {
            delete defines["USE_EXACT_SRGB_CONVERSIONS"];
        }
        return;
    }
    else {
        let s = "";
        if (isNDCHalfZRange) {
            s += "#define IS_NDC_HALF_ZRANGE";
        }
        if (useReverseDepthBuffer) {
            if (s) {
                s += "\n";
            }
            s += "#define USE_REVERSE_DEPTHBUFFER";
        }
        if (useExactSrgbConversions) {
            if (s) {
                s += "\n";
            }
            s += "#define USE_EXACT_SRGB_CONVERSIONS";
        }
        return s;
    }
}
/**
 * Allocate a typed array depending on a texture type. Optionally can copy existing data in the buffer.
 * @param type type of the texture
 * @param sizeOrDstBuffer size of the array OR an existing buffer that will be used as the destination of the copy (if copyBuffer is provided)
 * @param sizeInBytes true if the size of the array is given in bytes, false if it is the number of elements of the array
 * @param copyBuffer if provided, buffer to copy into the destination buffer (either a newly allocated buffer if sizeOrDstBuffer is a number or use sizeOrDstBuffer as the destination buffer otherwise)
 * @returns the allocated buffer or sizeOrDstBuffer if the latter is an ArrayBuffer
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export function allocateAndCopyTypedBuffer(type, sizeOrDstBuffer, sizeInBytes = false, copyBuffer) {
    switch (type) {
        case Constants.TEXTURETYPE_BYTE: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int8Array(sizeOrDstBuffer) : new Int8Array(sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int8Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_UNSIGNED_BYTE: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint8Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_SHORT: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int16Array(sizeOrDstBuffer) : new Int16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int16Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_UNSIGNED_SHORT:
        case Constants.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4:
        case Constants.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1:
        case Constants.TEXTURETYPE_UNSIGNED_SHORT_5_6_5:
        case Constants.TEXTURETYPE_HALF_FLOAT: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint16Array(sizeOrDstBuffer) : new Uint16Array(sizeInBytes ? sizeOrDstBuffer / 2 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint16Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_INT: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Int32Array(sizeOrDstBuffer) : new Int32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Int32Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_UNSIGNED_INTEGER:
        case Constants.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV:
        case Constants.TEXTURETYPE_UNSIGNED_INT_24_8:
        case Constants.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV:
        case Constants.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV:
        case Constants.TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint32Array(sizeOrDstBuffer) : new Uint32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Uint32Array(copyBuffer));
            }
            return buffer;
        }
        case Constants.TEXTURETYPE_FLOAT: {
            const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Float32Array(sizeOrDstBuffer) : new Float32Array(sizeInBytes ? sizeOrDstBuffer / 4 : sizeOrDstBuffer);
            if (copyBuffer) {
                buffer.set(new Float32Array(copyBuffer));
            }
            return buffer;
        }
    }
    const buffer = sizeOrDstBuffer instanceof ArrayBuffer ? new Uint8Array(sizeOrDstBuffer) : new Uint8Array(sizeOrDstBuffer);
    if (copyBuffer) {
        buffer.set(new Uint8Array(copyBuffer));
    }
    return buffer;
}
//# sourceMappingURL=abstractEngine.functions.js.map