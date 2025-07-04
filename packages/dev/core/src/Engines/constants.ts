/* eslint-disable @typescript-eslint/naming-convention */
/** Defines the cross module used constants to avoid circular dependencies */
export class Constants {
    /** Sampler suffix when associated with a texture name */
    public static readonly AUTOSAMPLERSUFFIX = "Sampler";
    /** Flag used to disable diagnostics for WebGPU */
    public static readonly DISABLEUA = "#define DISABLE_UNIFORMITY_ANALYSIS";
    /** Defines that alpha blending is disabled */
    public static readonly ALPHA_DISABLE = 0;
    /** Defines that alpha blending is COLOR=SRC_ALPHA * SRC + DEST, ALPHA=DEST_ALPHA */
    public static readonly ALPHA_ADD = 1;
    /**
     *  Defines that alpha blending is COLOR=SRC_ALPHA * SRC + (1 - SRC_ALPHA) * DEST, ALPHA=SRC_ALPHA + DEST_ALPHA
     *  Go-to for transparency. 100% alpha means source, 0% alpha means background. Glass, UI fade, smoke
     */
    public static readonly ALPHA_COMBINE = 2;
    /**
     * Defines that alpha blending is COLOR=(1 - SRC) * DEST, ALPHA=SRC_ALPHA - DEST_ALPHA
     * Subtracts source from destination, leading to darker results
     * */
    public static readonly ALPHA_SUBTRACT = 3;
    /** Defines that alpha blending is COLOR=DEST * SRC, ALPHA=SRC_ALPHA + DEST_ALPHA */
    public static readonly ALPHA_MULTIPLY = 4;
    /**
     * Defines that alpha blending is COLOR=SRC_ALPHA * SRC + (1 - SRC) * DEST, ALPHA=SRC_ALPHA + DEST_ALPHA
     * Prioritizes area with high source alpha, strongly emphasizes the source
     */
    public static readonly ALPHA_MAXIMIZED = 5;
    /**
     * Defines that alpha blending is COLOR=SRC + DEST, ALPHA=DEST_ALPHA
     * Source color is added to the destination color without alpha affecting the result. Great for additive glow effects (fire, magic, lasers)
     */
    public static readonly ALPHA_ONEONE = 6;
    /** Defines that alpha blending is COLOR=SRC + (1 - SRC_ALPHA) * DEST, ALPHA=SRC_ALPHA + DEST_ALPHA */
    public static readonly ALPHA_PREMULTIPLIED = 7;
    /** Defines that alpha blending is COLOR=SRC + (1 - SRC_ALPHA) * DEST, ALPHA=SRC_ALPHA + (1 - SRC_ALPHA) * DEST_ALPHA */
    public static readonly ALPHA_PREMULTIPLIED_PORTERDUFF = 8;
    /**
     * Defines that alpha blending is COLOR=CST * SRC + (1 - CST) * DEST, ALPHA=CST_ALPHA * SRC + (1 - CST_ALPHA) * DEST_ALPHA
     * Where CST is user-supplied color
     */
    public static readonly ALPHA_INTERPOLATE = 9;
    /**
     * Defines that alpha blending is COLOR=SRC + (1 - SRC) * DEST, ALPHA=SRC_ALPHA + (1 - SRC_ALPHA) * DEST_ALPHA
     * Brightens, good for soft light or UI highlights (like photoshop's screen blend)
     */
    public static readonly ALPHA_SCREENMODE = 10;
    /**
     * Defines that alpha blending is COLOR=SRC + DST, ALPHA=SRC_ALPHA + DEST_ALPHA
     * Straight addition of color and alpha- use when you want both source and destination colors and opacities to stack
     */
    public static readonly ALPHA_ONEONE_ONEONE = 11;
    /**
     * Defines that alpha blending is COLOR=DEST_ALPHA * SRC + DST, ALPHA=0
     */
    public static readonly ALPHA_ALPHATOCOLOR = 12;
    /**
     * Defines that alpha blending is COLOR=(1 - DEST) * SRC + (1 - SRC) * DEST, ALPHA=(1 - DEST_ALPHA) * SRC_ALPHA + (1 - SRC_ALPHA) * DEST_ALPHA
     * Result is between source and destination, used for experimental blending or styled effects
     */
    public static readonly ALPHA_REVERSEONEMINUS = 13;
    /**
     * Defines that alpha blending is ALPHA=SRC + (1 - SRC ALPHA) * DEST, ALPHA=SRC_ALPHA + (1 - SRC ALPHA) * DEST_ALPHA
     * Smooths blending between source and destination, useful in layered alpha masks
     */
    public static readonly ALPHA_SRC_DSTONEMINUSSRCALPHA = 14;
    /**
     * Defines that alpha blending is COLOR=SRC + DST, ALPHA=SRC_ALPHA
     * Color stacks, but only source alpha is kept
     */
    public static readonly ALPHA_ONEONE_ONEZERO = 15;
    /**
     * Defines that alpha blending is COLOR=(1 - DEST) * SRC + (1 - SRC) * DEST, ALPHA=DEST_ALPHA
     * Produces inverted look (negative space), like 'exclusion' mode in photoshop
     */
    public static readonly ALPHA_EXCLUSION = 16;
    /**
     * Defines that alpha blending is COLOR=SRC_ALPHA * SRC + (1 - SRC ALPHA) * DEST, ALPHA=SRC_ALPHA + (1 - SRC_ALPHA) * DEST_ALPHA
     * Great for layered rendering (particles, fog volumes), accumulates transparency in a more physically accurate way
     */
    public static readonly ALPHA_LAYER_ACCUMULATE = 17;

    /**
     * Defines that alpha blending is COLOR=MIN(SRC, DEST), ALPHA=MIN(SRC_ALPHA, DEST_ALPHA)
     */
    public static readonly ALPHA_MIN = 18;

    /**
     * Defines that alpha blending is COLOR=MAX(SRC, DEST), ALPHA=MAX(SRC_ALPHA, DEST_ALPHA)
     */
    public static readonly ALPHA_MAX = 19;

    /**
     * Defines that alpha blending uses dual source blending and is COLOR=SRC + SRC1 * DEST, ALPHA=DST_ALPHA
     */
    public static readonly ALPHA_DUAL_SRC0_ADD_SRC1xDST = 20;

    /** Defines that alpha blending equation a SUM */
    public static readonly ALPHA_EQUATION_ADD = 0;
    /** Defines that alpha blending equation a SUBSTRACTION */
    public static readonly ALPHA_EQUATION_SUBSTRACT = 1;
    /** Defines that alpha blending equation a REVERSE SUBSTRACTION */
    public static readonly ALPHA_EQUATION_REVERSE_SUBTRACT = 2;
    /** Defines that alpha blending equation a MAX operation */
    public static readonly ALPHA_EQUATION_MAX = 3;
    /** Defines that alpha blending equation a MIN operation */
    public static readonly ALPHA_EQUATION_MIN = 4;
    /**
     * Defines that alpha blending equation a DARKEN operation:
     * It takes the min of the src and sums the alpha channels.
     */
    public static readonly ALPHA_EQUATION_DARKEN = 5;

    /** Defines that the resource is not delayed*/
    public static readonly DELAYLOADSTATE_NONE = 0;
    /** Defines that the resource was successfully delay loaded */
    public static readonly DELAYLOADSTATE_LOADED = 1;
    /** Defines that the resource is currently delay loading */
    public static readonly DELAYLOADSTATE_LOADING = 2;
    /** Defines that the resource is delayed and has not started loading */
    public static readonly DELAYLOADSTATE_NOTLOADED = 4;

    // Depth or Stencil test Constants.
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will never pass. i.e. Nothing will be drawn */
    public static readonly NEVER = 0x0200;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will always pass. i.e. Pixels will be drawn in the order they are drawn */
    public static readonly ALWAYS = 0x0207;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than the stored value */
    public static readonly LESS = 0x0201;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is equals to the stored value */
    public static readonly EQUAL = 0x0202;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is less than or equal to the stored value */
    public static readonly LEQUAL = 0x0203;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than the stored value */
    public static readonly GREATER = 0x0204;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is greater than or equal to the stored value */
    public static readonly GEQUAL = 0x0206;
    /** Passed to depthFunction or stencilFunction to specify depth or stencil tests will pass if the new depth value is not equal to the stored value */
    public static readonly NOTEQUAL = 0x0205;

    // Stencil Actions Constants.
    /** Passed to stencilOperation to specify that stencil value must be kept */
    public static readonly KEEP = 0x1e00;
    /** Passed to stencilOperation to specify that stencil value must be zero */
    public static readonly ZERO = 0x0000;
    /** Passed to stencilOperation to specify that stencil value must be replaced */
    public static readonly REPLACE = 0x1e01;
    /** Passed to stencilOperation to specify that stencil value must be incremented */
    public static readonly INCR = 0x1e02;
    /** Passed to stencilOperation to specify that stencil value must be decremented */
    public static readonly DECR = 0x1e03;
    /** Passed to stencilOperation to specify that stencil value must be inverted */
    public static readonly INVERT = 0x150a;
    /** Passed to stencilOperation to specify that stencil value must be incremented with wrapping */
    public static readonly INCR_WRAP = 0x8507;
    /** Passed to stencilOperation to specify that stencil value must be decremented with wrapping */
    public static readonly DECR_WRAP = 0x8508;

    /** Texture is not repeating outside of 0..1 UVs */
    public static readonly TEXTURE_CLAMP_ADDRESSMODE = 0;
    /** Texture is repeating outside of 0..1 UVs */
    public static readonly TEXTURE_WRAP_ADDRESSMODE = 1;
    /** Texture is repeating and mirrored */
    public static readonly TEXTURE_MIRROR_ADDRESSMODE = 2;

    /** Flag to create a storage texture */
    public static readonly TEXTURE_CREATIONFLAG_STORAGE = 1;

    /** ALPHA */
    public static readonly TEXTUREFORMAT_ALPHA = 0;
    /** LUMINANCE */
    public static readonly TEXTUREFORMAT_LUMINANCE = 1;
    /** LUMINANCE_ALPHA */
    public static readonly TEXTUREFORMAT_LUMINANCE_ALPHA = 2;
    /** RGB */
    public static readonly TEXTUREFORMAT_RGB = 4;
    /** RGBA */
    public static readonly TEXTUREFORMAT_RGBA = 5;
    /** RED */
    public static readonly TEXTUREFORMAT_RED = 6;
    /** RED (2nd reference) */
    public static readonly TEXTUREFORMAT_R = 6;
    /** RED unsigned short normed to [0, 1] **/
    public static readonly TEXTUREFORMAT_R16_UNORM = 0x822a;
    /** RG unsigned short normed to [0, 1] **/
    public static readonly TEXTUREFORMAT_RG16_UNORM = 0x822c;
    /** RGB unsigned short normed to [0, 1] **/
    public static readonly TEXTUREFORMAT_RGB16_UNORM = 0x8054;
    /** RGBA unsigned short normed to [0, 1] **/
    public static readonly TEXTUREFORMAT_RGBA16_UNORM = 0x805b;
    /** RED signed short normed to [-1, 1] **/
    public static readonly TEXTUREFORMAT_R16_SNORM = 0x8f98;
    /** RG signed short normed to [-1, 1] **/
    public static readonly TEXTUREFORMAT_RG16_SNORM = 0x8f99;
    /** RGB signed short normed to [-1, 1] **/
    public static readonly TEXTUREFORMAT_RGB16_SNORM = 0x8f9a;
    /** RGBA signed short normed to [-1, 1] **/
    public static readonly TEXTUREFORMAT_RGBA16_SNORM = 0x8f9b;
    /** RG */
    public static readonly TEXTUREFORMAT_RG = 7;
    /** RED_INTEGER */
    public static readonly TEXTUREFORMAT_RED_INTEGER = 8;
    /** RED_INTEGER (2nd reference) */
    public static readonly TEXTUREFORMAT_R_INTEGER = 8;
    /** RG_INTEGER */
    public static readonly TEXTUREFORMAT_RG_INTEGER = 9;
    /** RGB_INTEGER */
    public static readonly TEXTUREFORMAT_RGB_INTEGER = 10;
    /** RGBA_INTEGER */
    public static readonly TEXTUREFORMAT_RGBA_INTEGER = 11;
    /** BGRA */
    public static readonly TEXTUREFORMAT_BGRA = 12;

    /** Depth 24 bits + Stencil 8 bits */
    public static readonly TEXTUREFORMAT_DEPTH24_STENCIL8 = 13;
    /** Depth 32 bits float */
    public static readonly TEXTUREFORMAT_DEPTH32_FLOAT = 14;
    /** Depth 16 bits */
    public static readonly TEXTUREFORMAT_DEPTH16 = 15;
    /** Depth 24 bits */
    public static readonly TEXTUREFORMAT_DEPTH24 = 16;
    /** Depth 24 bits unorm + Stencil 8 bits */
    public static readonly TEXTUREFORMAT_DEPTH24UNORM_STENCIL8 = 17;
    /** Depth 32 bits float + Stencil 8 bits */
    public static readonly TEXTUREFORMAT_DEPTH32FLOAT_STENCIL8 = 18;
    /** Stencil 8 bits */
    public static readonly TEXTUREFORMAT_STENCIL8 = 19;
    /** UNDEFINED */
    public static readonly TEXTUREFORMAT_UNDEFINED = 0xffffffff;

    /** Compressed BC7 */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA_BPTC_UNORM = 36492;
    /** Compressed BC7 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_BPTC_UNORM = 36493;
    /** Compressed BC6 unsigned float */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT = 36495;
    /** Compressed BC6 signed float */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB_BPTC_SIGNED_FLOAT = 36494;
    /** Compressed BC3 */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT5 = 33779;
    /** Compressed BC3 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT = 35919;
    /** Compressed BC2 */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT3 = 33778;
    /** Compressed BC2 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT = 35918;
    /** Compressed BC1 (RGBA) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA_S3TC_DXT1 = 33777;
    /** Compressed BC1 (RGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB_S3TC_DXT1 = 33776;
    /** Compressed BC1 (SRGB+A) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT = 35917;
    /** Compressed BC1 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB_S3TC_DXT1_EXT = 35916;
    /** Compressed ASTC 4x4 */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA_ASTC_4x4 = 37808;
    /** Compressed ASTC 4x4 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR = 37840;
    /** Compressed ETC1 (RGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB_ETC1_WEBGL = 36196;
    /** Compressed ETC2 (RGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB8_ETC2 = 37492;
    /** Compressed ETC2 (SRGB) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB8_ETC2 = 37493;
    /** Compressed ETC2 (RGB+A1) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37494;
    /** Compressed ETC2 (SRGB+A1)*/
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB8_PUNCHTHROUGH_ALPHA1_ETC2 = 37495;
    /** Compressed ETC2 (RGB+A) */
    public static readonly TEXTUREFORMAT_COMPRESSED_RGBA8_ETC2_EAC = 37496;
    /** Compressed ETC2 (SRGB+1) */
    public static readonly TEXTUREFORMAT_COMPRESSED_SRGB8_ALPHA8_ETC2_EAC = 37497;

    /** UNSIGNED_BYTE */
    public static readonly TEXTURETYPE_UNSIGNED_BYTE = 0;
    /** @deprecated use more explicit TEXTURETYPE_UNSIGNED_BYTE instead. Use TEXTURETYPE_UNSIGNED_INTEGER for 32bits values.*/
    public static readonly TEXTURETYPE_UNSIGNED_INT = 0;
    /** FLOAT */
    public static readonly TEXTURETYPE_FLOAT = 1;
    /** HALF_FLOAT */
    public static readonly TEXTURETYPE_HALF_FLOAT = 2;
    /** BYTE */
    public static readonly TEXTURETYPE_BYTE = 3;
    /** SHORT */
    public static readonly TEXTURETYPE_SHORT = 4;
    /** UNSIGNED_SHORT */
    public static readonly TEXTURETYPE_UNSIGNED_SHORT = 5;
    /** INT */
    public static readonly TEXTURETYPE_INT = 6;
    /** UNSIGNED_INT */
    public static readonly TEXTURETYPE_UNSIGNED_INTEGER = 7;
    /** UNSIGNED_SHORT_4_4_4_4 */
    public static readonly TEXTURETYPE_UNSIGNED_SHORT_4_4_4_4 = 8;
    /** UNSIGNED_SHORT_5_5_5_1 */
    public static readonly TEXTURETYPE_UNSIGNED_SHORT_5_5_5_1 = 9;
    /** UNSIGNED_SHORT_5_6_5 */
    public static readonly TEXTURETYPE_UNSIGNED_SHORT_5_6_5 = 10;
    /** UNSIGNED_INT_2_10_10_10_REV */
    public static readonly TEXTURETYPE_UNSIGNED_INT_2_10_10_10_REV = 11;
    /** UNSIGNED_INT_24_8 */
    public static readonly TEXTURETYPE_UNSIGNED_INT_24_8 = 12;
    /** UNSIGNED_INT_10F_11F_11F_REV */
    public static readonly TEXTURETYPE_UNSIGNED_INT_10F_11F_11F_REV = 13;
    /** UNSIGNED_INT_5_9_9_9_REV */
    public static readonly TEXTURETYPE_UNSIGNED_INT_5_9_9_9_REV = 14;
    /** FLOAT_32_UNSIGNED_INT_24_8_REV */
    public static readonly TEXTURETYPE_FLOAT_32_UNSIGNED_INT_24_8_REV = 15;
    /** UNDEFINED */
    public static readonly TEXTURETYPE_UNDEFINED = 16;

    /** 2D Texture target*/
    public static readonly TEXTURE_2D = 3553;
    /** 2D Array Texture target */
    public static readonly TEXTURE_2D_ARRAY = 35866;
    /** Cube Map Texture target */
    public static readonly TEXTURE_CUBE_MAP = 34067;
    /** Cube Map Array Texture target */
    public static readonly TEXTURE_CUBE_MAP_ARRAY = 0xdeadbeef;
    /** 3D Texture target */
    public static readonly TEXTURE_3D = 32879;

    /** nearest is mag = nearest and min = nearest and no mip */
    public static readonly TEXTURE_NEAREST_SAMPLINGMODE = 1;
    /** mag = nearest and min = nearest and mip = none */
    public static readonly TEXTURE_NEAREST_NEAREST = 1;

    /** Bilinear is mag = linear and min = linear and no mip */
    public static readonly TEXTURE_BILINEAR_SAMPLINGMODE = 2;
    /** mag = linear and min = linear and mip = none */
    public static readonly TEXTURE_LINEAR_LINEAR = 2;

    /** Trilinear is mag = linear and min = linear and mip = linear */
    public static readonly TEXTURE_TRILINEAR_SAMPLINGMODE = 3;
    /** Trilinear is mag = linear and min = linear and mip = linear */
    public static readonly TEXTURE_LINEAR_LINEAR_MIPLINEAR = 3;

    /** mag = nearest and min = nearest and mip = nearest */
    public static readonly TEXTURE_NEAREST_NEAREST_MIPNEAREST = 4;
    /** mag = nearest and min = linear and mip = nearest */
    public static readonly TEXTURE_NEAREST_LINEAR_MIPNEAREST = 5;
    /** mag = nearest and min = linear and mip = linear */
    public static readonly TEXTURE_NEAREST_LINEAR_MIPLINEAR = 6;
    /** mag = nearest and min = linear and mip = none */
    public static readonly TEXTURE_NEAREST_LINEAR = 7;
    /** nearest is mag = nearest and min = nearest and mip = linear */
    public static readonly TEXTURE_NEAREST_NEAREST_MIPLINEAR = 8;
    /** mag = linear and min = nearest and mip = nearest */
    public static readonly TEXTURE_LINEAR_NEAREST_MIPNEAREST = 9;
    /** mag = linear and min = nearest and mip = linear */
    public static readonly TEXTURE_LINEAR_NEAREST_MIPLINEAR = 10;
    /** Bilinear is mag = linear and min = linear and mip = nearest */
    public static readonly TEXTURE_LINEAR_LINEAR_MIPNEAREST = 11;
    /** mag = linear and min = nearest and mip = none */
    public static readonly TEXTURE_LINEAR_NEAREST = 12;

    /** Explicit coordinates mode */
    public static readonly TEXTURE_EXPLICIT_MODE = 0;
    /** Spherical coordinates mode */
    public static readonly TEXTURE_SPHERICAL_MODE = 1;
    /** Planar coordinates mode */
    public static readonly TEXTURE_PLANAR_MODE = 2;
    /** Cubic coordinates mode */
    public static readonly TEXTURE_CUBIC_MODE = 3;
    /** Projection coordinates mode */
    public static readonly TEXTURE_PROJECTION_MODE = 4;
    /** Skybox coordinates mode */
    public static readonly TEXTURE_SKYBOX_MODE = 5;
    /** Inverse Cubic coordinates mode */
    public static readonly TEXTURE_INVCUBIC_MODE = 6;
    /** Equirectangular coordinates mode */
    public static readonly TEXTURE_EQUIRECTANGULAR_MODE = 7;
    /** Equirectangular Fixed coordinates mode */
    public static readonly TEXTURE_FIXED_EQUIRECTANGULAR_MODE = 8;
    /** Equirectangular Fixed Mirrored coordinates mode */
    public static readonly TEXTURE_FIXED_EQUIRECTANGULAR_MIRRORED_MODE = 9;

    /** Offline (baking) quality for texture filtering */
    public static readonly TEXTURE_FILTERING_QUALITY_OFFLINE = 4096;

    /** High quality for texture filtering */
    public static readonly TEXTURE_FILTERING_QUALITY_HIGH = 64;

    /** Medium quality for texture filtering */
    public static readonly TEXTURE_FILTERING_QUALITY_MEDIUM = 16;

    /** Low quality for texture filtering */
    public static readonly TEXTURE_FILTERING_QUALITY_LOW = 8;

    // Texture rescaling mode
    /** Defines that texture rescaling will use a floor to find the closer power of 2 size */
    public static readonly SCALEMODE_FLOOR = 1;
    /** Defines that texture rescaling will look for the nearest power of 2 size */
    public static readonly SCALEMODE_NEAREST = 2;
    /** Defines that texture rescaling will use a ceil to find the closer power of 2 size */
    public static readonly SCALEMODE_CEILING = 3;

    /**
     * The dirty texture flag value
     */
    public static readonly MATERIAL_TextureDirtyFlag = 1;
    /**
     * The dirty light flag value
     */
    public static readonly MATERIAL_LightDirtyFlag = 2;
    /**
     * The dirty fresnel flag value
     */
    public static readonly MATERIAL_FresnelDirtyFlag = 4;
    /**
     * The dirty attribute flag value
     */
    public static readonly MATERIAL_AttributesDirtyFlag = 8;
    /**
     * The dirty misc flag value
     */
    public static readonly MATERIAL_MiscDirtyFlag = 16;
    /**
     * The dirty prepass flag value
     */
    public static readonly MATERIAL_PrePassDirtyFlag = 32;
    /**
     * The dirty image processing flag value
     */
    public static readonly MATERIAL_ImageProcessingDirtyFlag = 64;
    /**
     * The all dirty flag value
     */
    public static readonly MATERIAL_AllDirtyFlag = 127;

    /**
     * Returns the triangle fill mode
     */
    public static readonly MATERIAL_TriangleFillMode = 0;
    /**
     * Returns the wireframe mode
     */
    public static readonly MATERIAL_WireFrameFillMode = 1;
    /**
     * Returns the point fill mode
     */
    public static readonly MATERIAL_PointFillMode = 2;
    /**
     * Returns the point list draw mode
     */
    public static readonly MATERIAL_PointListDrawMode = 3;
    /**
     * Returns the line list draw mode
     */
    public static readonly MATERIAL_LineListDrawMode = 4;
    /**
     * Returns the line loop draw mode
     */
    public static readonly MATERIAL_LineLoopDrawMode = 5;
    /**
     * Returns the line strip draw mode
     */
    public static readonly MATERIAL_LineStripDrawMode = 6;

    /**
     * Returns the triangle strip draw mode
     */
    public static readonly MATERIAL_TriangleStripDrawMode = 7;
    /**
     * Returns the triangle fan draw mode
     */
    public static readonly MATERIAL_TriangleFanDrawMode = 8;

    /**
     * Stores the clock-wise side orientation
     */
    public static readonly MATERIAL_ClockWiseSideOrientation = 0;
    /**
     * Stores the counter clock-wise side orientation
     */
    public static readonly MATERIAL_CounterClockWiseSideOrientation = 1;

    /**
     * Energy-conserving Oren Nayar diffuse model type.
     */
    public static readonly MATERIAL_DIFFUSE_MODEL_E_OREN_NAYAR = 0;

    /**
     * Burley diffuse model type.
     */
    public static readonly MATERIAL_DIFFUSE_MODEL_BURLEY = 1;

    /**
     * Lambertian diffuse model type.
     */
    public static readonly MATERIAL_DIFFUSE_MODEL_LAMBERT = 2;

    /**
     * Babylon.js version less than 8.x
     * IBL Lambert + Burley diffuse model type.
     */
    public static readonly MATERIAL_DIFFUSE_MODEL_LEGACY = 3;

    /**
     * Specular lighting for dielectric materials follows the logic
     * in the glTF specification and KHR_materials_specular extension.
     * Specular colour is applied only at normal incidence (i.e. F0) while
     * glancing angles (i.e. F90) tend towards white.
     */
    public static readonly MATERIAL_DIELECTRIC_SPECULAR_MODEL_GLTF = 0;

    /**
     * Specular lighting for dielectric materials follows the logic
     * in the OpenPBR specification. Specular colour is applied to all
     * dielectric reflection, not just at normal incidence (i.e. F0).
     */
    public static readonly MATERIAL_DIELECTRIC_SPECULAR_MODEL_OPENPBR = 1;

    /**
     * Specular lighting for metals follows the logic in the glTF specification.
     * Base colour is applied at F0 while glancing angles tend towards white.
     */
    public static readonly MATERIAL_CONDUCTOR_SPECULAR_MODEL_GLTF = 0;

    /**
     * Specular lighting for metals follows the logic in the OpenPBR specification.
     * Specular colour is applied to glancing angles using the F82 spec.
     */
    public static readonly MATERIAL_CONDUCTOR_SPECULAR_MODEL_OPENPBR = 1;

    /**
     * Nothing
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_NothingTrigger = 0;
    /**
     * On pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPickTrigger = 1;
    /**
     * On left pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnLeftPickTrigger = 2;
    /**
     * On right pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnRightPickTrigger = 3;
    /**
     * On center pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnCenterPickTrigger = 4;
    /**
     * On pick down
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPickDownTrigger = 5;
    /**
     * On double pick
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnDoublePickTrigger = 6;
    /**
     * On pick up
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPickUpTrigger = 7;
    /**
     * On pick out.
     * This trigger will only be raised if you also declared a OnPickDown
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPickOutTrigger = 16;
    /**
     * On long press
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnLongPressTrigger = 8;
    /**
     * On pointer over
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPointerOverTrigger = 9;
    /**
     * On pointer out
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnPointerOutTrigger = 10;
    /**
     * On every frame
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnEveryFrameTrigger = 11;
    /**
     * On intersection enter
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnIntersectionEnterTrigger = 12;
    /**
     * On intersection exit
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnIntersectionExitTrigger = 13;
    /**
     * On key down
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnKeyDownTrigger = 14;
    /**
     * On key up
     * @see https://doc.babylonjs.com/features/featuresDeepDive/events/actions#triggers
     */
    public static readonly ACTION_OnKeyUpTrigger = 15;

    /**
     * Billboard mode will only apply to Y axis
     */
    public static readonly PARTICLES_BILLBOARDMODE_Y = 2;
    /**
     * Billboard mode will apply to all axes
     */
    public static readonly PARTICLES_BILLBOARDMODE_ALL = 7;
    /**
     * Special billboard mode where the particle will be biilboard to the camera but rotated to align with direction
     */
    public static readonly PARTICLES_BILLBOARDMODE_STRETCHED = 8;
    /**
     * Special billboard mode where the particle will be billboard to the camera but only around the axis of the direction of particle emission
     */
    public static readonly PARTICLES_BILLBOARDMODE_STRETCHED_LOCAL = 9;

    /** Default culling strategy : this is an exclusion test and it's the more accurate.
     *  Test order :
     *  Is the bounding sphere outside the frustum ?
     *  If not, are the bounding box vertices outside the frustum ?
     *  It not, then the cullable object is in the frustum.
     */
    public static readonly MESHES_CULLINGSTRATEGY_STANDARD = 0;
    /** Culling strategy : Bounding Sphere Only.
     *  This is an exclusion test. It's faster than the standard strategy because the bounding box is not tested.
     *  It's also less accurate than the standard because some not visible objects can still be selected.
     *  Test : is the bounding sphere outside the frustum ?
     *  If not, then the cullable object is in the frustum.
     */
    public static readonly MESHES_CULLINGSTRATEGY_BOUNDINGSPHERE_ONLY = 1;
    /** Culling strategy : Optimistic Inclusion.
     *  This in an inclusion test first, then the standard exclusion test.
     *  This can be faster when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the standard test when the tested object center is not the frustum but one of its bounding box vertex is still inside.
     *  Anyway, it's as accurate as the standard strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the default culling strategy.
     */
    public static readonly MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION = 2;
    /** Culling strategy : Optimistic Inclusion then Bounding Sphere Only.
     *  This in an inclusion test first, then the bounding sphere only exclusion test.
     *  This can be the fastest test when a cullable object is expected to be almost always in the camera frustum.
     *  This could also be a little slower than the BoundingSphereOnly strategy when the tested object center is not in the frustum but its bounding sphere still intersects it.
     *  It's less accurate than the standard strategy and as accurate as the BoundingSphereOnly strategy.
     *  Test :
     *  Is the cullable object bounding sphere center in the frustum ?
     *  If not, apply the Bounding Sphere Only strategy. No Bounding Box is tested here.
     */
    public static readonly MESHES_CULLINGSTRATEGY_OPTIMISTIC_INCLUSION_THEN_BSPHERE_ONLY = 3;

    /**
     * No logging while loading
     */
    public static readonly SCENELOADER_NO_LOGGING = 0;
    /**
     * Minimal logging while loading
     */
    public static readonly SCENELOADER_MINIMAL_LOGGING = 1;
    /**
     * Summary logging while loading
     */
    public static readonly SCENELOADER_SUMMARY_LOGGING = 2;
    /**
     * Detailed logging while loading
     */
    public static readonly SCENELOADER_DETAILED_LOGGING = 3;

    /**
     * Constant used to retrieve the irradiance texture index in the textures array in the prepass
     * using getIndex(Constants.PREPASS_IRRADIANCE_TEXTURE_TYPE)
     */
    public static readonly PREPASS_IRRADIANCE_TEXTURE_TYPE = 0;
    /**
     * Constant used to retrieve the position texture index in the textures array in the prepass
     * using getIndex(Constants.PREPASS_POSITION_TEXTURE_INDEX)
     */
    public static readonly PREPASS_POSITION_TEXTURE_TYPE = 1;
    /**
     * Constant used to retrieve the velocity texture index in the textures array in the prepass
     * using getIndex(Constants.PREPASS_VELOCITY_TEXTURE_TYPE)
     */
    public static readonly PREPASS_VELOCITY_TEXTURE_TYPE = 2;
    /**
     * Constant used to retrieve the reflectivity texture index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_REFLECTIVITY_TEXTURE_TYPE)
     */
    public static readonly PREPASS_REFLECTIVITY_TEXTURE_TYPE = 3;
    /**
     * Constant used to retrieve the lit color texture index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_COLOR_TEXTURE_TYPE)
     */
    public static readonly PREPASS_COLOR_TEXTURE_TYPE = 4;
    /**
     * Constant used to retrieve (camera view) depth index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_DEPTH_TEXTURE_TYPE)
     */
    public static readonly PREPASS_DEPTH_TEXTURE_TYPE = 5;
    /**
     * Constant used to retrieve normal index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_NORMAL_TEXTURE_TYPE)
     */
    public static readonly PREPASS_NORMAL_TEXTURE_TYPE = 6;
    /**
     * Constant used to retrieve (sqrt) albedo index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_ALBEDO_SQRT_TEXTURE_TYPE)
     */
    public static readonly PREPASS_ALBEDO_SQRT_TEXTURE_TYPE = 7;

    /**
     * Constant used to retrieve world normal index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_WORLD_NORMAL_TEXTURE_TYPE)
     */
    public static readonly PREPASS_WORLD_NORMAL_TEXTURE_TYPE = 8;

    /**
     * Constant used to retrieve the local position texture index in the textures array in the prepass
     * using getIndex(Constants.PREPASS_LOCAL_POSITION_TEXTURE_TYPE)
     */
    public static readonly PREPASS_LOCAL_POSITION_TEXTURE_TYPE = 9;

    /**
     * Constant used to retrieve screen-space (non-linear) depth index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_SCREENSPACE_DEPTH_TEXTURE_TYPE)
     */
    public static readonly PREPASS_SCREENSPACE_DEPTH_TEXTURE_TYPE = 10;

    /**
     * Constant used to retrieve the velocity texture index in the textures array in the prepass
     * using getIndex(Constants.PREPASS_VELOCITY_LINEAR_TEXTURE_TYPE)
     */
    public static readonly PREPASS_VELOCITY_LINEAR_TEXTURE_TYPE = 11;

    /**
     * Constant used to retrieve albedo index in the textures array in the prepass
     * using the getIndex(Constants.PREPASS_ALBEDO_TEXTURE_TYPE)
     */
    public static readonly PREPASS_ALBEDO_TEXTURE_TYPE = 12;

    /**
     * Constant used to retrieve normalized camera view depth geometry texture
     */
    public static readonly PREPASS_NORMALIZED_VIEW_DEPTH_TEXTURE_TYPE = 13;

    /** Flag to create a readable buffer (the buffer can be the source of a copy) */
    public static readonly BUFFER_CREATIONFLAG_READ = 1;
    /** Flag to create a writable buffer (the buffer can be the destination of a copy) */
    public static readonly BUFFER_CREATIONFLAG_WRITE = 2;
    /** Flag to create a readable and writable buffer */
    public static readonly BUFFER_CREATIONFLAG_READWRITE = 3;
    /** Flag to create a buffer suitable to be used as a uniform buffer */
    public static readonly BUFFER_CREATIONFLAG_UNIFORM = 4;
    /** Flag to create a buffer suitable to be used as a vertex buffer */
    public static readonly BUFFER_CREATIONFLAG_VERTEX = 8;
    /** Flag to create a buffer suitable to be used as an index buffer */
    public static readonly BUFFER_CREATIONFLAG_INDEX = 16;
    /** Flag to create a buffer suitable to be used as a storage buffer */
    public static readonly BUFFER_CREATIONFLAG_STORAGE = 32;
    /** Flag to create a buffer suitable to be used for indirect calls, such as `dispatchIndirect` */
    public static readonly BUFFER_CREATIONFLAG_INDIRECT = 64;

    /**
     * Prefixes used by the engine for sub mesh draw wrappers
     */

    /** @internal */
    public static readonly RENDERPASS_MAIN = 0;

    /**
     * Constant used as key code for Alt key
     */
    public static readonly INPUT_ALT_KEY = 18;

    /**
     * Constant used as key code for Ctrl key
     */
    public static readonly INPUT_CTRL_KEY = 17;

    /**
     * Constant used as key code for Meta key (Left Win, Left Cmd)
     */
    public static readonly INPUT_META_KEY1 = 91;

    /**
     * Constant used as key code for Meta key (Right Win)
     */
    public static readonly INPUT_META_KEY2 = 92;

    /**
     * Constant used as key code for Meta key (Right Win, Right Cmd)
     */
    public static readonly INPUT_META_KEY3 = 93;

    /**
     * Constant used as key code for Shift key
     */
    public static readonly INPUT_SHIFT_KEY = 16;

    /** Standard snapshot rendering. In this mode, some form of dynamic behavior is possible (for eg, uniform buffers are still updated) */
    public static readonly SNAPSHOTRENDERING_STANDARD = 0;

    /** Fast snapshot rendering. In this mode, everything is static and only some limited form of dynamic behaviour is possible */
    public static readonly SNAPSHOTRENDERING_FAST = 1;

    /**
     * This is the default projection mode used by the cameras.
     * It helps recreating a feeling of perspective and better appreciate depth.
     * This is the best way to simulate real life cameras.
     */
    public static readonly PERSPECTIVE_CAMERA = 0;
    /**
     * This helps creating camera with an orthographic mode.
     * Orthographic is commonly used in engineering as a means to produce object specifications that communicate dimensions unambiguously, each line of 1 unit length (cm, meter..whatever) will appear to have the same length everywhere on the drawing. This allows the drafter to dimension only a subset of lines and let the reader know that other lines of that length on the drawing are also that length in reality. Every parallel line in the drawing is also parallel in the object.
     */
    public static readonly ORTHOGRAPHIC_CAMERA = 1;

    /**
     * This is the default FOV mode for perspective cameras.
     * This setting aligns the upper and lower bounds of the viewport to the upper and lower bounds of the camera frustum.
     */
    public static readonly FOVMODE_VERTICAL_FIXED = 0;
    /**
     * This setting aligns the left and right bounds of the viewport to the left and right bounds of the camera frustum.
     */
    public static readonly FOVMODE_HORIZONTAL_FIXED = 1;

    /**
     * This specifies there is no need for a camera rig.
     * Basically only one eye is rendered corresponding to the camera.
     */
    public static readonly RIG_MODE_NONE = 0;
    /**
     * Simulates a camera Rig with one blue eye and one red eye.
     * This can be use with 3d blue and red glasses.
     */
    public static readonly RIG_MODE_STEREOSCOPIC_ANAGLYPH = 10;
    /**
     * Defines that both eyes of the camera will be rendered side by side with a parallel target.
     */
    public static readonly RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_PARALLEL = 11;
    /**
     * Defines that both eyes of the camera will be rendered side by side with a none parallel target.
     */
    public static readonly RIG_MODE_STEREOSCOPIC_SIDEBYSIDE_CROSSEYED = 12;
    /**
     * Defines that both eyes of the camera will be rendered over under each other.
     */
    public static readonly RIG_MODE_STEREOSCOPIC_OVERUNDER = 13;
    /**
     * Defines that both eyes of the camera will be rendered on successive lines interlaced for passive 3d monitors.
     */
    public static readonly RIG_MODE_STEREOSCOPIC_INTERLACED = 14;
    /**
     * Defines that both eyes of the camera should be renderered in a VR mode (carbox).
     */
    public static readonly RIG_MODE_VR = 20;
    /**
     * Custom rig mode allowing rig cameras to be populated manually with any number of cameras
     */
    public static readonly RIG_MODE_CUSTOM = 22;

    /**
     * Maximum number of uv sets supported
     */
    public static readonly MAX_SUPPORTED_UV_SETS = 6;

    /**
     * GL constants
     */
    /** Alpha blend equation: ADD */
    public static readonly GL_ALPHA_EQUATION_ADD = 0x8006;
    /** Alpha equation: MIN */
    public static readonly GL_ALPHA_EQUATION_MIN = 0x8007;
    /** Alpha equation: MAX */
    public static readonly GL_ALPHA_EQUATION_MAX = 0x8008;
    /** Alpha equation: SUBTRACT */
    public static readonly GL_ALPHA_EQUATION_SUBTRACT = 0x800a;
    /** Alpha equation: REVERSE_SUBTRACT */
    public static readonly GL_ALPHA_EQUATION_REVERSE_SUBTRACT = 0x800b;

    /** Alpha blend function: SRC */
    public static readonly GL_ALPHA_FUNCTION_SRC = 0x0300;
    /** Alpha blend function: ONE_MINUS_SRC */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR = 0x0301;
    /** Alpha blend function: SRC_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_SRC_ALPHA = 0x0302;
    /** Alpha blend function: ONE_MINUS_SRC_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA = 0x0303;
    /** Alpha blend function: DST_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_DST_ALPHA = 0x0304;
    /** Alpha blend function: ONE_MINUS_DST_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_DST_ALPHA = 0x0305;
    /** Alpha blend function: ONE_MINUS_DST */
    public static readonly GL_ALPHA_FUNCTION_DST_COLOR = 0x0306;
    /** Alpha blend function: ONE_MINUS_DST */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_DST_COLOR = 0x0307;
    /** Alpha blend function: SRC_ALPHA_SATURATED */
    public static readonly GL_ALPHA_FUNCTION_SRC_ALPHA_SATURATED = 0x0308;
    /** Alpha blend function: CONSTANT */
    public static readonly GL_ALPHA_FUNCTION_CONSTANT_COLOR = 0x8001;
    /** Alpha blend function: ONE_MINUS_CONSTANT */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_COLOR = 0x8002;
    /** Alpha blend function: CONSTANT_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_CONSTANT_ALPHA = 0x8003;
    /** Alpha blend function: ONE_MINUS_CONSTANT_ALPHA */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_ALPHA = 0x8004;
    /** Alpha blend function: SRC1 */
    public static readonly GL_ALPHA_FUNCTION_SRC1_COLOR = 0x88f9;
    /** Alpha blend function: SRC1 */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_SRC1_COLOR = 0x88fa;
    /** Alpha blend function: SRC1 */
    public static readonly GL_ALPHA_FUNCTION_SRC1_ALPHA = 0x8589;
    /** Alpha blend function: SRC1 */
    public static readonly GL_ALPHA_FUNCTION_ONE_MINUS_SRC1_ALPHA = 0x88fb;

    /** URL to the snippet server. Points to the public snippet server by default */
    public static SnippetUrl = "https://snippet.babylonjs.com";

    /** The fog is deactivated */
    public static FOGMODE_NONE = 0;
    /** The fog density is following an exponential function */
    public static FOGMODE_EXP = 1;
    /** The fog density is following an exponential function faster than FOGMODE_EXP */
    public static FOGMODE_EXP2 = 2;
    /** The fog density is following a linear function. */
    public static FOGMODE_LINEAR = 3;

    /**
     * The byte type.
     */
    public static BYTE = 5120;

    /**
     * The unsigned byte type.
     */
    public static UNSIGNED_BYTE = 5121;

    /**
     * The short type.
     */
    public static SHORT = 5122;

    /**
     * The unsigned short type.
     */
    public static UNSIGNED_SHORT = 5123;

    /**
     * The integer type.
     */
    public static INT = 5124;

    /**
     * The unsigned integer type.
     */
    public static UNSIGNED_INT = 5125;

    /**
     * The float type.
     */
    public static FLOAT = 5126;

    /**
     * Positions
     */
    public static PositionKind = "position";
    /**
     * Normals
     */
    public static NormalKind = "normal";
    /**
     * Tangents
     */
    public static TangentKind = "tangent";
    /**
     * Texture coordinates
     */
    public static UVKind = "uv";
    /**
     * Texture coordinates 2
     */
    public static UV2Kind = "uv2";
    /**
     * Texture coordinates 3
     */
    public static UV3Kind = "uv3";
    /**
     * Texture coordinates 4
     */
    public static UV4Kind = "uv4";
    /**
     * Texture coordinates 5
     */
    public static UV5Kind = "uv5";
    /**
     * Texture coordinates 6
     */
    public static UV6Kind = "uv6";
    /**
     * Colors
     */
    public static ColorKind = "color";
    /**
     * Instance Colors
     */
    public static ColorInstanceKind = "instanceColor";
    /**
     * Matrix indices (for bones)
     */
    public static MatricesIndicesKind = "matricesIndices";
    /**
     * Matrix weights (for bones)
     */
    public static MatricesWeightsKind = "matricesWeights";
    /**
     * Additional matrix indices (for bones)
     */
    public static MatricesIndicesExtraKind = "matricesIndicesExtra";
    /**
     * Additional matrix weights (for bones)
     */
    public static MatricesWeightsExtraKind = "matricesWeightsExtra";

    // Animation type
    /**
     * Float animation type
     */
    public static readonly ANIMATIONTYPE_FLOAT = 0;
    /**
     * Vector3 animation type
     */
    public static readonly ANIMATIONTYPE_VECTOR3 = 1;
    /**
     * Quaternion animation type
     */
    public static readonly ANIMATIONTYPE_QUATERNION = 2;
    /**
     * Matrix animation type
     */
    public static readonly ANIMATIONTYPE_MATRIX = 3;
    /**
     * Color3 animation type
     */
    public static readonly ANIMATIONTYPE_COLOR3 = 4;
    /**
     * Color3 animation type
     */
    public static readonly ANIMATIONTYPE_COLOR4 = 7;
    /**
     * Vector2 animation type
     */
    public static readonly ANIMATIONTYPE_VECTOR2 = 5;
    /**
     * Size animation type
     */
    public static readonly ANIMATIONTYPE_SIZE = 6;

    /**
     * The default minZ value for the near plane of a frustum light
     */
    public static ShadowMinZ = 0;
    /**
     * The default maxZ value for the far plane of a frustum light
     */
    public static ShadowMaxZ = 10000;
}
