import { MaterialDefines } from "core-for-lottie-player/Materials/materialDefines.js";
import { MaterialPluginBase } from "core-for-lottie-player/Materials/materialPluginBase.js";
import type { InternalTexture } from "core-for-lottie-player/Materials/Textures/internalTexture.js";
import type { Material } from "core-for-lottie-player/Materials/material.js";
import type { StandardMaterial } from "core-for-lottie-player/Materials/standardMaterial.js";
import { PBRBaseMaterial } from "core-for-lottie-player/Materials/PBR/pbrBaseMaterial.js";
import type { UniformBuffer } from "core-for-lottie-player/Materials/uniformBuffer.js";
import { ShaderLanguage } from "core-for-lottie-player/Materials/shaderLanguage.js";
import { OpenPBRMaterial } from "core-for-lottie-player/Materials/PBR/openPbrMaterial.js";
/**
 * @internal
 */
declare class MaterialIBLShadowsRenderDefines extends MaterialDefines {
    RENDER_WITH_IBL_SHADOWS: boolean;
    COLORED_IBL_SHADOWS: boolean;
}
/**
 * Plugin used to render the contribution from IBL shadows.
 */
export declare class IBLShadowsPluginMaterial extends MaterialPluginBase {
    /**
     * Defines the name of the plugin.
     */
    static readonly Name = "IBLShadowsPluginMaterial";
    /**
     * The texture containing the contribution from IBL shadows.
     */
    iblShadowsTexture: InternalTexture;
    /**
     * The opacity of the shadows.
     */
    shadowOpacity: number;
    private _isEnabled;
    private _isColored;
    get isColored(): boolean;
    set isColored(value: boolean);
    /**
     * Defines if the plugin is enabled in the material.
     */
    isEnabled: boolean;
    protected _markAllSubMeshesAsTexturesDirty(): void;
    private _internalMarkAllSubMeshesAsTexturesDirty;
    /**
     * Gets a boolean indicating that the plugin is compatible with a give shader language.
     * @returns true if the plugin is compatible with the shader language
     */
    isCompatible(): boolean;
    constructor(material: Material | StandardMaterial | PBRBaseMaterial | OpenPBRMaterial);
    prepareDefines(defines: MaterialIBLShadowsRenderDefines): void;
    getClassName(): string;
    getUniforms(): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        fragment: string;
    };
    getSamplers(samplers: string[]): void;
    bindForSubMesh(uniformBuffer: UniformBuffer): void;
    getCustomCode(shaderType: string, shaderLanguage: ShaderLanguage): {
        [name: string]: string;
    } | null;
}
export {};
