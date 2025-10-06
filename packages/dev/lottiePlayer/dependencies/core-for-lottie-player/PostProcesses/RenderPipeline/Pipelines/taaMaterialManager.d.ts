import type { Material } from "core-for-lottie-player/Materials/material.js";
import { MaterialDefines } from "core-for-lottie-player/Materials/materialDefines.js";
import { MaterialPluginBase } from "core-for-lottie-player/Materials/materialPluginBase.js";
import { ShaderLanguage } from "core-for-lottie-player/Materials/shaderLanguage.js";
import type { UniformBuffer } from "core-for-lottie-player/Materials/uniformBuffer.js";
import { Vector2 } from "core-for-lottie-player/Maths/math.vector.js";
import type { Scene } from "core-for-lottie-player/scene.js";
import type { Nullable } from "core-for-lottie-player/types.js";
declare class TAAJitterMaterialDefines extends MaterialDefines {
    TAA_JITTER: boolean;
}
declare class TAAJitterMaterialPlugin extends MaterialPluginBase {
    static readonly Name = "TAAJitter";
    private _manager;
    get manager(): Nullable<TAAMaterialManager>;
    set manager(manager: Nullable<TAAMaterialManager>);
    get isEnabled(): boolean;
    constructor(material: Material);
    /** @internal */
    _updateMaterial(): void;
    isCompatible(): boolean;
    getClassName(): string;
    prepareDefines(defines: TAAJitterMaterialDefines): void;
    getUniforms(shaderLanguage?: ShaderLanguage): {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        vertex: string;
    } | {
        ubo: {
            name: string;
            size: number;
            type: string;
        }[];
        vertex?: undefined;
    };
    hardBindForSubMesh(uniformBuffer: UniformBuffer): void;
    getCustomCode(shaderType: string, shaderLanguage?: ShaderLanguage): {
        CUSTOM_VERTEX_MAIN_END: string;
    } | null;
    dispose(): void;
}
/**
 * Applies and manages the TAA jitter plugin on all materials.
 */
export declare class TAAMaterialManager {
    private _isEnabled;
    /**
     * Set to enable or disable the jitter offset on all materials.
     */
    get isEnabled(): boolean;
    set isEnabled(enabled: boolean);
    /**
     * The current jitter offset to apply to all materials.
     */
    readonly jitter: Vector2;
    /** @internal */
    readonly _materialPlugins: TAAJitterMaterialPlugin[];
    /**
     * @param scene All materials in this scene will have a jitter offset applied to them.
     */
    constructor(scene: Scene);
    /**
     * Disposes of the material manager.
     */
    dispose(): void;
    private _getPlugin;
}
export {};
