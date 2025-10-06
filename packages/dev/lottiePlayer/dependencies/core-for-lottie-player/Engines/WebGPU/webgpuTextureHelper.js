import { ILog2 } from "../../Maths/math.scalar.functions.js";
import { Constants } from "../constants.js";
/** @internal */
export class WebGPUTextureHelper {
    static ComputeNumMipmapLevels(width, height) {
        return ILog2(Math.max(width, height)) + 1;
    }
    static GetTextureTypeFromFormat(format) {
        switch (format) {
            // One Component = 8 bits unsigned
            case "r8unorm" /* WebGPUConstants.TextureFormat.R8Unorm */:
            case "r8uint" /* WebGPUConstants.TextureFormat.R8Uint */:
            case "rg8unorm" /* WebGPUConstants.TextureFormat.RG8Unorm */:
            case "rg8uint" /* WebGPUConstants.TextureFormat.RG8Uint */:
            case "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */:
            case "rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.RGBA8UnormSRGB */:
            case "rgba8uint" /* WebGPUConstants.TextureFormat.RGBA8Uint */:
            case "bgra8unorm" /* WebGPUConstants.TextureFormat.BGRA8Unorm */:
            case "bgra8unorm-srgb" /* WebGPUConstants.TextureFormat.BGRA8UnormSRGB */:
            case "rgb10a2uint" /* WebGPUConstants.TextureFormat.RGB10A2UINT */: // composite format - let's say it's byte...
            case "rgb10a2unorm" /* WebGPUConstants.TextureFormat.RGB10A2Unorm */: // composite format - let's say it's byte...
            case "rgb9e5ufloat" /* WebGPUConstants.TextureFormat.RGB9E5UFloat */: // composite format - let's say it's byte...
            case "rg11b10ufloat" /* WebGPUConstants.TextureFormat.RG11B10UFloat */: // composite format - let's say it's byte...
            case "bc7-rgba-unorm" /* WebGPUConstants.TextureFormat.BC7RGBAUnorm */:
            case "bc7-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC7RGBAUnormSRGB */:
            case "bc6h-rgb-ufloat" /* WebGPUConstants.TextureFormat.BC6HRGBUFloat */:
            case "bc5-rg-unorm" /* WebGPUConstants.TextureFormat.BC5RGUnorm */:
            case "bc3-rgba-unorm" /* WebGPUConstants.TextureFormat.BC3RGBAUnorm */:
            case "bc3-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC3RGBAUnormSRGB */:
            case "bc2-rgba-unorm" /* WebGPUConstants.TextureFormat.BC2RGBAUnorm */:
            case "bc2-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC2RGBAUnormSRGB */:
            case "bc4-r-unorm" /* WebGPUConstants.TextureFormat.BC4RUnorm */:
            case "bc1-rgba-unorm" /* WebGPUConstants.TextureFormat.BC1RGBAUnorm */:
            case "bc1-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC1RGBAUnormSRGB */:
            case "etc2-rgb8unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8Unorm */:
            case "etc2-rgb8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8UnormSRGB */:
            case "etc2-rgb8a1unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8A1Unorm */:
            case "etc2-rgb8a1unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8A1UnormSRGB */:
            case "etc2-rgba8unorm" /* WebGPUConstants.TextureFormat.ETC2RGBA8Unorm */:
            case "etc2-rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGBA8UnormSRGB */:
            case "eac-r11unorm" /* WebGPUConstants.TextureFormat.EACR11Unorm */:
            case "eac-rg11unorm" /* WebGPUConstants.TextureFormat.EACRG11Unorm */:
            case "astc-4x4-unorm" /* WebGPUConstants.TextureFormat.ASTC4x4Unorm */:
            case "astc-4x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC4x4UnormSRGB */:
            case "astc-5x4-unorm" /* WebGPUConstants.TextureFormat.ASTC5x4Unorm */:
            case "astc-5x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x4UnormSRGB */:
            case "astc-5x5-unorm" /* WebGPUConstants.TextureFormat.ASTC5x5Unorm */:
            case "astc-5x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x5UnormSRGB */:
            case "astc-6x5-unorm" /* WebGPUConstants.TextureFormat.ASTC6x5Unorm */:
            case "astc-6x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x5UnormSRGB */:
            case "astc-6x6-unorm" /* WebGPUConstants.TextureFormat.ASTC6x6Unorm */:
            case "astc-6x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x6UnormSRGB */:
            case "astc-8x5-unorm" /* WebGPUConstants.TextureFormat.ASTC8x5Unorm */:
            case "astc-8x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x5UnormSRGB */:
            case "astc-8x6-unorm" /* WebGPUConstants.TextureFormat.ASTC8x6Unorm */:
            case "astc-8x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x6UnormSRGB */:
            case "astc-8x8-unorm" /* WebGPUConstants.TextureFormat.ASTC8x8Unorm */:
            case "astc-8x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x8UnormSRGB */:
            case "astc-10x5-unorm" /* WebGPUConstants.TextureFormat.ASTC10x5Unorm */:
            case "astc-10x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x5UnormSRGB */:
            case "astc-10x6-unorm" /* WebGPUConstants.TextureFormat.ASTC10x6Unorm */:
            case "astc-10x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x6UnormSRGB */:
            case "astc-10x8-unorm" /* WebGPUConstants.TextureFormat.ASTC10x8Unorm */:
            case "astc-10x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x8UnormSRGB */:
            case "astc-10x10-unorm" /* WebGPUConstants.TextureFormat.ASTC10x10Unorm */:
            case "astc-10x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x10UnormSRGB */:
            case "astc-12x10-unorm" /* WebGPUConstants.TextureFormat.ASTC12x10Unorm */:
            case "astc-12x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x10UnormSRGB */:
            case "astc-12x12-unorm" /* WebGPUConstants.TextureFormat.ASTC12x12Unorm */:
            case "astc-12x12-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x12UnormSRGB */:
            case "stencil8" /* WebGPUConstants.TextureFormat.Stencil8 */:
                return Constants.TEXTURETYPE_UNSIGNED_BYTE;
            // One Component = 8 bits signed
            case "r8snorm" /* WebGPUConstants.TextureFormat.R8Snorm */:
            case "r8sint" /* WebGPUConstants.TextureFormat.R8Sint */:
            case "rg8snorm" /* WebGPUConstants.TextureFormat.RG8Snorm */:
            case "rg8sint" /* WebGPUConstants.TextureFormat.RG8Sint */:
            case "rgba8snorm" /* WebGPUConstants.TextureFormat.RGBA8Snorm */:
            case "rgba8sint" /* WebGPUConstants.TextureFormat.RGBA8Sint */:
            case "bc6h-rgb-float" /* WebGPUConstants.TextureFormat.BC6HRGBFloat */:
            case "bc5-rg-snorm" /* WebGPUConstants.TextureFormat.BC5RGSnorm */:
            case "bc4-r-snorm" /* WebGPUConstants.TextureFormat.BC4RSnorm */:
            case "eac-r11snorm" /* WebGPUConstants.TextureFormat.EACR11Snorm */:
            case "eac-rg11snorm" /* WebGPUConstants.TextureFormat.EACRG11Snorm */:
                return Constants.TEXTURETYPE_BYTE;
            // One component = 16 bits unsigned
            case "r16uint" /* WebGPUConstants.TextureFormat.R16Uint */:
            case "r16unorm" /* WebGPUConstants.TextureFormat.R16Unorm */:
            case "rg16unorm" /* WebGPUConstants.TextureFormat.RG16Unorm */:
            case "rgba16unorm" /* WebGPUConstants.TextureFormat.RGBA16Unorm */:
            case "rg16uint" /* WebGPUConstants.TextureFormat.RG16Uint */:
            case "rgba16uint" /* WebGPUConstants.TextureFormat.RGBA16Uint */:
            case "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */:
                return Constants.TEXTURETYPE_UNSIGNED_SHORT;
            // One component = 16 bits signed
            case "r16sint" /* WebGPUConstants.TextureFormat.R16Sint */:
            case "r16snorm" /* WebGPUConstants.TextureFormat.R16Snorm */:
            case "rg16snorm" /* WebGPUConstants.TextureFormat.RG16Snorm */:
            case "rgba16snorm" /* WebGPUConstants.TextureFormat.RGBA16Snorm */:
            case "rg16sint" /* WebGPUConstants.TextureFormat.RG16Sint */:
            case "rgba16sint" /* WebGPUConstants.TextureFormat.RGBA16Sint */:
                return Constants.TEXTURETYPE_SHORT;
            case "r16float" /* WebGPUConstants.TextureFormat.R16Float */:
            case "rg16float" /* WebGPUConstants.TextureFormat.RG16Float */:
            case "rgba16float" /* WebGPUConstants.TextureFormat.RGBA16Float */:
                return Constants.TEXTURETYPE_HALF_FLOAT;
            // One component = 32 bits unsigned
            case "r32uint" /* WebGPUConstants.TextureFormat.R32Uint */:
            case "rg32uint" /* WebGPUConstants.TextureFormat.RG32Uint */:
            case "rgba32uint" /* WebGPUConstants.TextureFormat.RGBA32Uint */:
                return Constants.TEXTURETYPE_UNSIGNED_INTEGER;
            // One component = 32 bits signed
            case "r32sint" /* WebGPUConstants.TextureFormat.R32Sint */:
            case "rg32sint" /* WebGPUConstants.TextureFormat.RG32Sint */:
            case "rgba32sint" /* WebGPUConstants.TextureFormat.RGBA32Sint */:
                return Constants.TEXTURETYPE_UNSIGNED_INTEGER;
            case "r32float" /* WebGPUConstants.TextureFormat.R32Float */:
            case "rg32float" /* WebGPUConstants.TextureFormat.RG32Float */:
            case "rgba32float" /* WebGPUConstants.TextureFormat.RGBA32Float */:
            case "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */:
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
            case "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */:
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
                return Constants.TEXTURETYPE_FLOAT;
        }
        return Constants.TEXTURETYPE_UNSIGNED_BYTE;
    }
    static GetBlockInformationFromFormat(format) {
        switch (format) {
            // 8 bits formats
            case "r8unorm" /* WebGPUConstants.TextureFormat.R8Unorm */:
            case "r8snorm" /* WebGPUConstants.TextureFormat.R8Snorm */:
            case "r8uint" /* WebGPUConstants.TextureFormat.R8Uint */:
            case "r8sint" /* WebGPUConstants.TextureFormat.R8Sint */:
                return { width: 1, height: 1, length: 1 };
            // 16 bits formats
            case "r16uint" /* WebGPUConstants.TextureFormat.R16Uint */:
            case "r16sint" /* WebGPUConstants.TextureFormat.R16Sint */:
            case "r16unorm" /* WebGPUConstants.TextureFormat.R16Unorm */:
            case "r16snorm" /* WebGPUConstants.TextureFormat.R16Snorm */:
            case "r16float" /* WebGPUConstants.TextureFormat.R16Float */:
            case "rg8unorm" /* WebGPUConstants.TextureFormat.RG8Unorm */:
            case "rg8snorm" /* WebGPUConstants.TextureFormat.RG8Snorm */:
            case "rg8uint" /* WebGPUConstants.TextureFormat.RG8Uint */:
            case "rg8sint" /* WebGPUConstants.TextureFormat.RG8Sint */:
                return { width: 1, height: 1, length: 2 };
            // 32 bits formats
            case "r32uint" /* WebGPUConstants.TextureFormat.R32Uint */:
            case "r32sint" /* WebGPUConstants.TextureFormat.R32Sint */:
            case "r32float" /* WebGPUConstants.TextureFormat.R32Float */:
            case "rg16uint" /* WebGPUConstants.TextureFormat.RG16Uint */:
            case "rg16sint" /* WebGPUConstants.TextureFormat.RG16Sint */:
            case "rg16float" /* WebGPUConstants.TextureFormat.RG16Float */:
            case "rg16unorm" /* WebGPUConstants.TextureFormat.RG16Unorm */:
            case "rg16snorm" /* WebGPUConstants.TextureFormat.RG16Snorm */:
            case "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */:
            case "rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.RGBA8UnormSRGB */:
            case "rgba8snorm" /* WebGPUConstants.TextureFormat.RGBA8Snorm */:
            case "rgba8uint" /* WebGPUConstants.TextureFormat.RGBA8Uint */:
            case "rgba8sint" /* WebGPUConstants.TextureFormat.RGBA8Sint */:
            case "bgra8unorm" /* WebGPUConstants.TextureFormat.BGRA8Unorm */:
            case "bgra8unorm-srgb" /* WebGPUConstants.TextureFormat.BGRA8UnormSRGB */:
            case "rgb9e5ufloat" /* WebGPUConstants.TextureFormat.RGB9E5UFloat */:
            case "rgb10a2uint" /* WebGPUConstants.TextureFormat.RGB10A2UINT */:
            case "rgb10a2unorm" /* WebGPUConstants.TextureFormat.RGB10A2Unorm */:
            case "rg11b10ufloat" /* WebGPUConstants.TextureFormat.RG11B10UFloat */:
                return { width: 1, height: 1, length: 4 };
            // 64 bits formats
            case "rg32uint" /* WebGPUConstants.TextureFormat.RG32Uint */:
            case "rg32sint" /* WebGPUConstants.TextureFormat.RG32Sint */:
            case "rg32float" /* WebGPUConstants.TextureFormat.RG32Float */:
            case "rgba16uint" /* WebGPUConstants.TextureFormat.RGBA16Uint */:
            case "rgba16sint" /* WebGPUConstants.TextureFormat.RGBA16Sint */:
            case "rgba16float" /* WebGPUConstants.TextureFormat.RGBA16Float */:
            case "rgba16unorm" /* WebGPUConstants.TextureFormat.RGBA16Unorm */:
            case "rgba16snorm" /* WebGPUConstants.TextureFormat.RGBA16Snorm */:
                return { width: 1, height: 1, length: 8 };
            // 128 bits formats
            case "rgba32uint" /* WebGPUConstants.TextureFormat.RGBA32Uint */:
            case "rgba32sint" /* WebGPUConstants.TextureFormat.RGBA32Sint */:
            case "rgba32float" /* WebGPUConstants.TextureFormat.RGBA32Float */:
                return { width: 1, height: 1, length: 16 };
            // Depth and stencil formats
            case "stencil8" /* WebGPUConstants.TextureFormat.Stencil8 */:
                // eslint-disable-next-line no-throw-literal
                throw "No fixed size for Stencil8 format!";
            case "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */:
                return { width: 1, height: 1, length: 2 };
            case "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */:
                // eslint-disable-next-line no-throw-literal
                throw "No fixed size for Depth24Plus format!";
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
                // eslint-disable-next-line no-throw-literal
                throw "No fixed size for Depth24PlusStencil8 format!";
            case "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */:
                return { width: 1, height: 1, length: 4 };
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
                return { width: 1, height: 1, length: 5 };
            // BC compressed formats usable if "texture-compression-bc" is both
            // supported by the device/user agent and enabled in requestDevice.
            case "bc7-rgba-unorm" /* WebGPUConstants.TextureFormat.BC7RGBAUnorm */:
            case "bc7-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC7RGBAUnormSRGB */:
            case "bc6h-rgb-ufloat" /* WebGPUConstants.TextureFormat.BC6HRGBUFloat */:
            case "bc6h-rgb-float" /* WebGPUConstants.TextureFormat.BC6HRGBFloat */:
            case "bc5-rg-unorm" /* WebGPUConstants.TextureFormat.BC5RGUnorm */:
            case "bc5-rg-snorm" /* WebGPUConstants.TextureFormat.BC5RGSnorm */:
            case "bc3-rgba-unorm" /* WebGPUConstants.TextureFormat.BC3RGBAUnorm */:
            case "bc3-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC3RGBAUnormSRGB */:
            case "bc2-rgba-unorm" /* WebGPUConstants.TextureFormat.BC2RGBAUnorm */:
            case "bc2-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC2RGBAUnormSRGB */:
                return { width: 4, height: 4, length: 16 };
            case "bc4-r-unorm" /* WebGPUConstants.TextureFormat.BC4RUnorm */:
            case "bc4-r-snorm" /* WebGPUConstants.TextureFormat.BC4RSnorm */:
            case "bc1-rgba-unorm" /* WebGPUConstants.TextureFormat.BC1RGBAUnorm */:
            case "bc1-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC1RGBAUnormSRGB */:
                return { width: 4, height: 4, length: 8 };
            // ETC2 compressed formats usable if "texture-compression-etc2" is both
            // supported by the device/user agent and enabled in requestDevice.
            case "etc2-rgb8unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8Unorm */:
            case "etc2-rgb8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8UnormSRGB */:
            case "etc2-rgb8a1unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8A1Unorm */:
            case "etc2-rgb8a1unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8A1UnormSRGB */:
            case "eac-r11unorm" /* WebGPUConstants.TextureFormat.EACR11Unorm */:
            case "eac-r11snorm" /* WebGPUConstants.TextureFormat.EACR11Snorm */:
                return { width: 4, height: 4, length: 8 };
            case "etc2-rgba8unorm" /* WebGPUConstants.TextureFormat.ETC2RGBA8Unorm */:
            case "etc2-rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGBA8UnormSRGB */:
            case "eac-rg11unorm" /* WebGPUConstants.TextureFormat.EACRG11Unorm */:
            case "eac-rg11snorm" /* WebGPUConstants.TextureFormat.EACRG11Snorm */:
                return { width: 4, height: 4, length: 16 };
            // ASTC compressed formats usable if "texture-compression-astc" is both
            // supported by the device/user agent and enabled in requestDevice.
            case "astc-4x4-unorm" /* WebGPUConstants.TextureFormat.ASTC4x4Unorm */:
            case "astc-4x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC4x4UnormSRGB */:
                return { width: 4, height: 4, length: 16 };
            case "astc-5x4-unorm" /* WebGPUConstants.TextureFormat.ASTC5x4Unorm */:
            case "astc-5x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x4UnormSRGB */:
                return { width: 5, height: 4, length: 16 };
            case "astc-5x5-unorm" /* WebGPUConstants.TextureFormat.ASTC5x5Unorm */:
            case "astc-5x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x5UnormSRGB */:
                return { width: 5, height: 5, length: 16 };
            case "astc-6x5-unorm" /* WebGPUConstants.TextureFormat.ASTC6x5Unorm */:
            case "astc-6x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x5UnormSRGB */:
                return { width: 6, height: 5, length: 16 };
            case "astc-6x6-unorm" /* WebGPUConstants.TextureFormat.ASTC6x6Unorm */:
            case "astc-6x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x6UnormSRGB */:
                return { width: 6, height: 6, length: 16 };
            case "astc-8x5-unorm" /* WebGPUConstants.TextureFormat.ASTC8x5Unorm */:
            case "astc-8x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x5UnormSRGB */:
                return { width: 8, height: 5, length: 16 };
            case "astc-8x6-unorm" /* WebGPUConstants.TextureFormat.ASTC8x6Unorm */:
            case "astc-8x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x6UnormSRGB */:
                return { width: 8, height: 6, length: 16 };
            case "astc-8x8-unorm" /* WebGPUConstants.TextureFormat.ASTC8x8Unorm */:
            case "astc-8x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x8UnormSRGB */:
                return { width: 8, height: 8, length: 16 };
            case "astc-10x5-unorm" /* WebGPUConstants.TextureFormat.ASTC10x5Unorm */:
            case "astc-10x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x5UnormSRGB */:
                return { width: 10, height: 5, length: 16 };
            case "astc-10x6-unorm" /* WebGPUConstants.TextureFormat.ASTC10x6Unorm */:
            case "astc-10x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x6UnormSRGB */:
                return { width: 10, height: 6, length: 16 };
            case "astc-10x8-unorm" /* WebGPUConstants.TextureFormat.ASTC10x8Unorm */:
            case "astc-10x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x8UnormSRGB */:
                return { width: 10, height: 8, length: 16 };
            case "astc-10x10-unorm" /* WebGPUConstants.TextureFormat.ASTC10x10Unorm */:
            case "astc-10x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x10UnormSRGB */:
                return { width: 10, height: 10, length: 16 };
            case "astc-12x10-unorm" /* WebGPUConstants.TextureFormat.ASTC12x10Unorm */:
            case "astc-12x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x10UnormSRGB */:
                return { width: 12, height: 10, length: 16 };
            case "astc-12x12-unorm" /* WebGPUConstants.TextureFormat.ASTC12x12Unorm */:
            case "astc-12x12-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x12UnormSRGB */:
                return { width: 12, height: 12, length: 16 };
        }
        return { width: 1, height: 1, length: 4 };
    }
    static IsHardwareTexture(texture) {
        return !!texture.release;
    }
    static IsInternalTexture(texture) {
        return !!texture.dispose;
    }
    static IsImageBitmap(imageBitmap) {
        return imageBitmap.close !== undefined;
    }
    static IsImageBitmapArray(imageBitmap) {
        return Array.isArray(imageBitmap) && imageBitmap[0].close !== undefined;
    }
    static IsCompressedFormat(format) {
        switch (format) {
            case "bc7-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC7RGBAUnormSRGB */:
            case "bc7-rgba-unorm" /* WebGPUConstants.TextureFormat.BC7RGBAUnorm */:
            case "bc6h-rgb-float" /* WebGPUConstants.TextureFormat.BC6HRGBFloat */:
            case "bc6h-rgb-ufloat" /* WebGPUConstants.TextureFormat.BC6HRGBUFloat */:
            case "bc5-rg-snorm" /* WebGPUConstants.TextureFormat.BC5RGSnorm */:
            case "bc5-rg-unorm" /* WebGPUConstants.TextureFormat.BC5RGUnorm */:
            case "bc4-r-snorm" /* WebGPUConstants.TextureFormat.BC4RSnorm */:
            case "bc4-r-unorm" /* WebGPUConstants.TextureFormat.BC4RUnorm */:
            case "bc3-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC3RGBAUnormSRGB */:
            case "bc3-rgba-unorm" /* WebGPUConstants.TextureFormat.BC3RGBAUnorm */:
            case "bc2-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC2RGBAUnormSRGB */:
            case "bc2-rgba-unorm" /* WebGPUConstants.TextureFormat.BC2RGBAUnorm */:
            case "bc1-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC1RGBAUnormSRGB */:
            case "bc1-rgba-unorm" /* WebGPUConstants.TextureFormat.BC1RGBAUnorm */:
            case "etc2-rgb8unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8Unorm */:
            case "etc2-rgb8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8UnormSRGB */:
            case "etc2-rgb8a1unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8A1Unorm */:
            case "etc2-rgb8a1unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8A1UnormSRGB */:
            case "etc2-rgba8unorm" /* WebGPUConstants.TextureFormat.ETC2RGBA8Unorm */:
            case "etc2-rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGBA8UnormSRGB */:
            case "eac-r11unorm" /* WebGPUConstants.TextureFormat.EACR11Unorm */:
            case "eac-r11snorm" /* WebGPUConstants.TextureFormat.EACR11Snorm */:
            case "eac-rg11unorm" /* WebGPUConstants.TextureFormat.EACRG11Unorm */:
            case "eac-rg11snorm" /* WebGPUConstants.TextureFormat.EACRG11Snorm */:
            case "astc-4x4-unorm" /* WebGPUConstants.TextureFormat.ASTC4x4Unorm */:
            case "astc-4x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC4x4UnormSRGB */:
            case "astc-5x4-unorm" /* WebGPUConstants.TextureFormat.ASTC5x4Unorm */:
            case "astc-5x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x4UnormSRGB */:
            case "astc-5x5-unorm" /* WebGPUConstants.TextureFormat.ASTC5x5Unorm */:
            case "astc-5x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x5UnormSRGB */:
            case "astc-6x5-unorm" /* WebGPUConstants.TextureFormat.ASTC6x5Unorm */:
            case "astc-6x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x5UnormSRGB */:
            case "astc-6x6-unorm" /* WebGPUConstants.TextureFormat.ASTC6x6Unorm */:
            case "astc-6x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x6UnormSRGB */:
            case "astc-8x5-unorm" /* WebGPUConstants.TextureFormat.ASTC8x5Unorm */:
            case "astc-8x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x5UnormSRGB */:
            case "astc-8x6-unorm" /* WebGPUConstants.TextureFormat.ASTC8x6Unorm */:
            case "astc-8x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x6UnormSRGB */:
            case "astc-8x8-unorm" /* WebGPUConstants.TextureFormat.ASTC8x8Unorm */:
            case "astc-8x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x8UnormSRGB */:
            case "astc-10x5-unorm" /* WebGPUConstants.TextureFormat.ASTC10x5Unorm */:
            case "astc-10x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x5UnormSRGB */:
            case "astc-10x6-unorm" /* WebGPUConstants.TextureFormat.ASTC10x6Unorm */:
            case "astc-10x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x6UnormSRGB */:
            case "astc-10x8-unorm" /* WebGPUConstants.TextureFormat.ASTC10x8Unorm */:
            case "astc-10x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x8UnormSRGB */:
            case "astc-10x10-unorm" /* WebGPUConstants.TextureFormat.ASTC10x10Unorm */:
            case "astc-10x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x10UnormSRGB */:
            case "astc-12x10-unorm" /* WebGPUConstants.TextureFormat.ASTC12x10Unorm */:
            case "astc-12x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x10UnormSRGB */:
            case "astc-12x12-unorm" /* WebGPUConstants.TextureFormat.ASTC12x12Unorm */:
            case "astc-12x12-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x12UnormSRGB */:
                return true;
        }
        return false;
    }
    static GetWebGPUTextureFormat(type, format, useSRGBBuffer = false) {
        switch (format) {
            case Constants.TEXTUREFORMAT_DEPTH16:
                return "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */;
            case Constants.TEXTUREFORMAT_DEPTH24:
                return "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */;
            case Constants.TEXTUREFORMAT_DEPTH24_STENCIL8:
                return "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */;
            case Constants.TEXTUREFORMAT_DEPTH32_FLOAT:
                return "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */;
            case Constants.TEXTUREFORMAT_DEPTH32FLOAT_STENCIL8:
                return "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */;
            case Constants.TEXTUREFORMAT_STENCIL8:
                return "stencil8" /* WebGPUConstants.TextureFormat.Stencil8 */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM:
                return useSRGBBuffer ? "bc7-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC7RGBAUnormSRGB */ : "bc7-rgba-unorm" /* WebGPUConstants.TextureFormat.BC7RGBAUnorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT:
                return "bc6h-rgb-ufloat" /* WebGPUConstants.TextureFormat.BC6HRGBUFloat */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGB_BPTC_SIGNED_FLOAT:
                return "bc6h-rgb-float" /* WebGPUConstants.TextureFormat.BC6HRGBFloat */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5:
                return useSRGBBuffer ? "bc3-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC3RGBAUnormSRGB */ : "bc3-rgba-unorm" /* WebGPUConstants.TextureFormat.BC3RGBAUnorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3:
                return useSRGBBuffer ? "bc2-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC2RGBAUnormSRGB */ : "bc2-rgba-unorm" /* WebGPUConstants.TextureFormat.BC2RGBAUnorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT1:
            case Constants.TEXTUREFORMAT_COMPRESSED_RGB_S3TC_DXT1:
                return useSRGBBuffer ? "bc1-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC1RGBAUnormSRGB */ : "bc1-rgba-unorm" /* WebGPUConstants.TextureFormat.BC1RGBAUnorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4:
                return useSRGBBuffer ? "astc-4x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC4x4UnormSRGB */ : "astc-4x4-unorm" /* WebGPUConstants.TextureFormat.ASTC4x4Unorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGB_ETC1_WEBGL:
            case Constants.TEXTUREFORMAT_COMPRESSED_RGB8_ETC2:
                return useSRGBBuffer ? "etc2-rgb8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8UnormSRGB */ : "etc2-rgb8unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8Unorm */;
            case Constants.TEXTUREFORMAT_COMPRESSED_RGBA8_ETC2_EAC:
                return useSRGBBuffer ? "etc2-rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGBA8UnormSRGB */ : "etc2-rgba8unorm" /* WebGPUConstants.TextureFormat.ETC2RGBA8Unorm */;
        }
        switch (type) {
            case Constants.TEXTURETYPE_BYTE:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED:
                        return "r8snorm" /* WebGPUConstants.TextureFormat.R8Snorm */;
                    case Constants.TEXTUREFORMAT_RG:
                        return "rg8snorm" /* WebGPUConstants.TextureFormat.RG8Snorm */;
                    case Constants.TEXTUREFORMAT_RGB:
                        // eslint-disable-next-line no-throw-literal
                        throw "RGB format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r8sint" /* WebGPUConstants.TextureFormat.R8Sint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg8sint" /* WebGPUConstants.TextureFormat.RG8Sint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba8sint" /* WebGPUConstants.TextureFormat.RGBA8Sint */;
                    default:
                        return "rgba8snorm" /* WebGPUConstants.TextureFormat.RGBA8Snorm */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_BYTE:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED:
                        return "r8unorm" /* WebGPUConstants.TextureFormat.R8Unorm */;
                    case Constants.TEXTUREFORMAT_RG:
                        return "rg8unorm" /* WebGPUConstants.TextureFormat.RG8Unorm */;
                    case Constants.TEXTUREFORMAT_RGB:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA:
                        return useSRGBBuffer ? "rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.RGBA8UnormSRGB */ : "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */;
                    case Constants.TEXTUREFORMAT_BGRA:
                        return useSRGBBuffer ? "bgra8unorm-srgb" /* WebGPUConstants.TextureFormat.BGRA8UnormSRGB */ : "bgra8unorm" /* WebGPUConstants.TextureFormat.BGRA8Unorm */;
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r8uint" /* WebGPUConstants.TextureFormat.R8Uint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg8uint" /* WebGPUConstants.TextureFormat.RG8Uint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba8uint" /* WebGPUConstants.TextureFormat.RGBA8Uint */;
                    case Constants.TEXTUREFORMAT_ALPHA:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_ALPHA format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_LUMINANCE:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_LUMINANCE format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_LUMINANCE_ALPHA:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_LUMINANCE_ALPHA format not supported in WebGPU";
                    default:
                        return "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */;
                }
            case Constants.TEXTURETYPE_SHORT:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r16sint" /* WebGPUConstants.TextureFormat.R16Sint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg16sint" /* WebGPUConstants.TextureFormat.RG16Sint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba16sint" /* WebGPUConstants.TextureFormat.RGBA16Sint */;
                    default:
                        return "rgba16sint" /* WebGPUConstants.TextureFormat.RGBA16Sint */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_SHORT:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r16uint" /* WebGPUConstants.TextureFormat.R16Uint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg16uint" /* WebGPUConstants.TextureFormat.RG16Uint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba16uint" /* WebGPUConstants.TextureFormat.RGBA16Uint */;
                    default:
                        return "rgba16uint" /* WebGPUConstants.TextureFormat.RGBA16Uint */;
                }
            case Constants.TEXTURETYPE_INT:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r32sint" /* WebGPUConstants.TextureFormat.R32Sint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg32sint" /* WebGPUConstants.TextureFormat.RG32Sint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba32sint" /* WebGPUConstants.TextureFormat.RGBA32Sint */;
                    default:
                        return "rgba32sint" /* WebGPUConstants.TextureFormat.RGBA32Sint */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_INTEGER: // Refers to UNSIGNED_INT
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED_INTEGER:
                        return "r32uint" /* WebGPUConstants.TextureFormat.R32Uint */;
                    case Constants.TEXTUREFORMAT_RG_INTEGER:
                        return "rg32uint" /* WebGPUConstants.TextureFormat.RG32Uint */;
                    case Constants.TEXTUREFORMAT_RGB_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB_INTEGER format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgba32uint" /* WebGPUConstants.TextureFormat.RGBA32Uint */;
                    default:
                        return "rgba32uint" /* WebGPUConstants.TextureFormat.RGBA32Uint */;
                }
            case Constants.TEXTURETYPE_FLOAT:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED:
                        return "r32float" /* WebGPUConstants.TextureFormat.R32Float */; // By default. Other possibility is R16Float.
                    case Constants.TEXTUREFORMAT_RG:
                        return "rg32float" /* WebGPUConstants.TextureFormat.RG32Float */; // By default. Other possibility is RG16Float.
                    case Constants.TEXTUREFORMAT_RGB:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA:
                        return "rgba32float" /* WebGPUConstants.TextureFormat.RGBA32Float */; // By default. Other possibility is RGBA16Float.
                    default:
                        return "rgba32float" /* WebGPUConstants.TextureFormat.RGBA32Float */;
                }
            case Constants.TEXTURETYPE_HALF_FLOAT:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RED:
                        return "r16float" /* WebGPUConstants.TextureFormat.R16Float */;
                    case Constants.TEXTUREFORMAT_RG:
                        return "rg16float" /* WebGPUConstants.TextureFormat.RG16Float */;
                    case Constants.TEXTUREFORMAT_RGB:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGB format not supported in WebGPU";
                    case Constants.TEXTUREFORMAT_RGBA:
                        return "rgba16float" /* WebGPUConstants.TextureFormat.RGBA16Float */;
                    default:
                        return "rgba16float" /* WebGPUConstants.TextureFormat.RGBA16Float */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_SHORT_5_6_5:
                // eslint-disable-next-line no-throw-literal
                throw "TEXTURETYPE_UNSIGNED_SHORT_5_6_5 format not supported in WebGPU";
            case Constants.TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RGBA:
                        return "rg11b10ufloat" /* WebGPUConstants.TextureFormat.RG11B10UFloat */;
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGBA_INTEGER format not supported in WebGPU when type is TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV";
                    default:
                        return "rg11b10ufloat" /* WebGPUConstants.TextureFormat.RG11B10UFloat */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RGBA:
                        return "rgb9e5ufloat" /* WebGPUConstants.TextureFormat.RGB9E5UFloat */;
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        // eslint-disable-next-line no-throw-literal
                        throw "TEXTUREFORMAT_RGBA_INTEGER format not supported in WebGPU when type is TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV";
                    default:
                        return "rgb9e5ufloat" /* WebGPUConstants.TextureFormat.RGB9E5UFloat */;
                }
            case Constants.TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4:
                // eslint-disable-next-line no-throw-literal
                throw "TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 format not supported in WebGPU";
            case Constants.TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1:
                // eslint-disable-next-line no-throw-literal
                throw "TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 format not supported in WebGPU";
            case Constants.TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV:
                switch (format) {
                    case Constants.TEXTUREFORMAT_RGBA:
                        return "rgb10a2unorm" /* WebGPUConstants.TextureFormat.RGB10A2Unorm */;
                    case Constants.TEXTUREFORMAT_RGBA_INTEGER:
                        return "rgb10a2uint" /* WebGPUConstants.TextureFormat.RGB10A2UINT */;
                    default:
                        return "rgb10a2unorm" /* WebGPUConstants.TextureFormat.RGB10A2Unorm */;
                }
        }
        return useSRGBBuffer ? "rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.RGBA8UnormSRGB */ : "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */;
    }
    static GetNumChannelsFromWebGPUTextureFormat(format) {
        switch (format) {
            case "r8unorm" /* WebGPUConstants.TextureFormat.R8Unorm */:
            case "r8snorm" /* WebGPUConstants.TextureFormat.R8Snorm */:
            case "r8uint" /* WebGPUConstants.TextureFormat.R8Uint */:
            case "r8sint" /* WebGPUConstants.TextureFormat.R8Sint */:
            case "bc4-r-unorm" /* WebGPUConstants.TextureFormat.BC4RUnorm */:
            case "bc4-r-snorm" /* WebGPUConstants.TextureFormat.BC4RSnorm */:
            case "r16uint" /* WebGPUConstants.TextureFormat.R16Uint */:
            case "r16sint" /* WebGPUConstants.TextureFormat.R16Sint */:
            case "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */:
            case "r16float" /* WebGPUConstants.TextureFormat.R16Float */:
            case "r16unorm" /* WebGPUConstants.TextureFormat.R16Unorm */:
            case "r16snorm" /* WebGPUConstants.TextureFormat.R16Snorm */:
            case "r32uint" /* WebGPUConstants.TextureFormat.R32Uint */:
            case "r32sint" /* WebGPUConstants.TextureFormat.R32Sint */:
            case "r32float" /* WebGPUConstants.TextureFormat.R32Float */:
            case "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */:
            case "stencil8" /* WebGPUConstants.TextureFormat.Stencil8 */:
            case "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */:
            case "eac-r11unorm" /* WebGPUConstants.TextureFormat.EACR11Unorm */:
            case "eac-r11snorm" /* WebGPUConstants.TextureFormat.EACR11Snorm */:
                return 1;
            case "rg8unorm" /* WebGPUConstants.TextureFormat.RG8Unorm */:
            case "rg8snorm" /* WebGPUConstants.TextureFormat.RG8Snorm */:
            case "rg8uint" /* WebGPUConstants.TextureFormat.RG8Uint */:
            case "rg8sint" /* WebGPUConstants.TextureFormat.RG8Sint */:
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
            case "bc5-rg-unorm" /* WebGPUConstants.TextureFormat.BC5RGUnorm */:
            case "bc5-rg-snorm" /* WebGPUConstants.TextureFormat.BC5RGSnorm */:
            case "rg16uint" /* WebGPUConstants.TextureFormat.RG16Uint */:
            case "rg16sint" /* WebGPUConstants.TextureFormat.RG16Sint */:
            case "rg16float" /* WebGPUConstants.TextureFormat.RG16Float */:
            case "rg16unorm" /* WebGPUConstants.TextureFormat.RG16Unorm */:
            case "rg16snorm" /* WebGPUConstants.TextureFormat.RG16Snorm */:
            case "rg32uint" /* WebGPUConstants.TextureFormat.RG32Uint */:
            case "rg32sint" /* WebGPUConstants.TextureFormat.RG32Sint */:
            case "rg32float" /* WebGPUConstants.TextureFormat.RG32Float */:
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
            case "eac-rg11unorm" /* WebGPUConstants.TextureFormat.EACRG11Unorm */:
            case "eac-rg11snorm" /* WebGPUConstants.TextureFormat.EACRG11Snorm */:
                return 2;
            case "rgb9e5ufloat" /* WebGPUConstants.TextureFormat.RGB9E5UFloat */:
            case "rg11b10ufloat" /* WebGPUConstants.TextureFormat.RG11B10UFloat */:
            case "bc6h-rgb-ufloat" /* WebGPUConstants.TextureFormat.BC6HRGBUFloat */:
            case "bc6h-rgb-float" /* WebGPUConstants.TextureFormat.BC6HRGBFloat */:
            case "etc2-rgb8unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8Unorm */:
            case "etc2-rgb8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8UnormSRGB */:
                return 3;
            case "rgba8unorm" /* WebGPUConstants.TextureFormat.RGBA8Unorm */:
            case "rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.RGBA8UnormSRGB */:
            case "rgba8snorm" /* WebGPUConstants.TextureFormat.RGBA8Snorm */:
            case "rgba8uint" /* WebGPUConstants.TextureFormat.RGBA8Uint */:
            case "rgba8sint" /* WebGPUConstants.TextureFormat.RGBA8Sint */:
            case "bgra8unorm" /* WebGPUConstants.TextureFormat.BGRA8Unorm */:
            case "bgra8unorm-srgb" /* WebGPUConstants.TextureFormat.BGRA8UnormSRGB */:
            case "rgba16unorm" /* WebGPUConstants.TextureFormat.RGBA16Unorm */:
            case "rgba16snorm" /* WebGPUConstants.TextureFormat.RGBA16Snorm */:
            case "rgb10a2uint" /* WebGPUConstants.TextureFormat.RGB10A2UINT */:
            case "rgb10a2unorm" /* WebGPUConstants.TextureFormat.RGB10A2Unorm */:
            case "bc7-rgba-unorm" /* WebGPUConstants.TextureFormat.BC7RGBAUnorm */:
            case "bc7-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC7RGBAUnormSRGB */:
            case "bc3-rgba-unorm" /* WebGPUConstants.TextureFormat.BC3RGBAUnorm */:
            case "bc3-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC3RGBAUnormSRGB */:
            case "bc2-rgba-unorm" /* WebGPUConstants.TextureFormat.BC2RGBAUnorm */:
            case "bc2-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC2RGBAUnormSRGB */:
            case "bc1-rgba-unorm" /* WebGPUConstants.TextureFormat.BC1RGBAUnorm */:
            case "bc1-rgba-unorm-srgb" /* WebGPUConstants.TextureFormat.BC1RGBAUnormSRGB */:
            case "rgba16uint" /* WebGPUConstants.TextureFormat.RGBA16Uint */:
            case "rgba16sint" /* WebGPUConstants.TextureFormat.RGBA16Sint */:
            case "rgba16float" /* WebGPUConstants.TextureFormat.RGBA16Float */:
            case "rgba32uint" /* WebGPUConstants.TextureFormat.RGBA32Uint */:
            case "rgba32sint" /* WebGPUConstants.TextureFormat.RGBA32Sint */:
            case "rgba32float" /* WebGPUConstants.TextureFormat.RGBA32Float */:
            case "etc2-rgb8a1unorm" /* WebGPUConstants.TextureFormat.ETC2RGB8A1Unorm */:
            case "etc2-rgb8a1unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGB8A1UnormSRGB */:
            case "etc2-rgba8unorm" /* WebGPUConstants.TextureFormat.ETC2RGBA8Unorm */:
            case "etc2-rgba8unorm-srgb" /* WebGPUConstants.TextureFormat.ETC2RGBA8UnormSRGB */:
            case "astc-4x4-unorm" /* WebGPUConstants.TextureFormat.ASTC4x4Unorm */:
            case "astc-4x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC4x4UnormSRGB */:
            case "astc-5x4-unorm" /* WebGPUConstants.TextureFormat.ASTC5x4Unorm */:
            case "astc-5x4-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x4UnormSRGB */:
            case "astc-5x5-unorm" /* WebGPUConstants.TextureFormat.ASTC5x5Unorm */:
            case "astc-5x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC5x5UnormSRGB */:
            case "astc-6x5-unorm" /* WebGPUConstants.TextureFormat.ASTC6x5Unorm */:
            case "astc-6x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x5UnormSRGB */:
            case "astc-6x6-unorm" /* WebGPUConstants.TextureFormat.ASTC6x6Unorm */:
            case "astc-6x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC6x6UnormSRGB */:
            case "astc-8x5-unorm" /* WebGPUConstants.TextureFormat.ASTC8x5Unorm */:
            case "astc-8x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x5UnormSRGB */:
            case "astc-8x6-unorm" /* WebGPUConstants.TextureFormat.ASTC8x6Unorm */:
            case "astc-8x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x6UnormSRGB */:
            case "astc-8x8-unorm" /* WebGPUConstants.TextureFormat.ASTC8x8Unorm */:
            case "astc-8x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC8x8UnormSRGB */:
            case "astc-10x5-unorm" /* WebGPUConstants.TextureFormat.ASTC10x5Unorm */:
            case "astc-10x5-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x5UnormSRGB */:
            case "astc-10x6-unorm" /* WebGPUConstants.TextureFormat.ASTC10x6Unorm */:
            case "astc-10x6-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x6UnormSRGB */:
            case "astc-10x8-unorm" /* WebGPUConstants.TextureFormat.ASTC10x8Unorm */:
            case "astc-10x8-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x8UnormSRGB */:
            case "astc-10x10-unorm" /* WebGPUConstants.TextureFormat.ASTC10x10Unorm */:
            case "astc-10x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC10x10UnormSRGB */:
            case "astc-12x10-unorm" /* WebGPUConstants.TextureFormat.ASTC12x10Unorm */:
            case "astc-12x10-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x10UnormSRGB */:
            case "astc-12x12-unorm" /* WebGPUConstants.TextureFormat.ASTC12x12Unorm */:
            case "astc-12x12-unorm-srgb" /* WebGPUConstants.TextureFormat.ASTC12x12UnormSRGB */:
                return 4;
        }
        // eslint-disable-next-line no-throw-literal
        throw `Unknown format ${format}!`;
    }
    static HasStencilAspect(format) {
        switch (format) {
            case "stencil8" /* WebGPUConstants.TextureFormat.Stencil8 */:
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
                return true;
        }
        return false;
    }
    static HasDepthAndStencilAspects(format) {
        switch (format) {
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
                return true;
        }
        return false;
    }
    static GetDepthFormatOnly(format) {
        switch (format) {
            case "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */:
                return "depth16unorm" /* WebGPUConstants.TextureFormat.Depth16Unorm */;
            case "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */:
                return "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */;
            case "depth24plus-stencil8" /* WebGPUConstants.TextureFormat.Depth24PlusStencil8 */:
                return "depth24plus" /* WebGPUConstants.TextureFormat.Depth24Plus */;
            case "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */:
                return "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */;
            case "depth32float-stencil8" /* WebGPUConstants.TextureFormat.Depth32FloatStencil8 */:
                return "depth32float" /* WebGPUConstants.TextureFormat.Depth32Float */;
        }
        return format;
    }
    static GetSample(sampleCount) {
        // WebGPU only supports 1 or 4
        return sampleCount > 1 ? 4 : 1;
    }
}
//# sourceMappingURL=webgpuTextureHelper.js.map