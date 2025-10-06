import type { Vector3 } from "core-for-lottie-player/Maths/math.vector.js";
import { Light } from "core-for-lottie-player/Lights/light.js";
import type { Effect } from "core-for-lottie-player/Materials/effect.js";
import type { ILTCTextures } from "core-for-lottie-player/Lights/LTC/ltcTextureTool.js";
import type { Scene } from "core-for-lottie-player/scene.js";
declare module "../scene.js" {
    interface Scene {
        /**
         * @internal
         */
        _ltcTextures?: ILTCTextures;
    }
}
/**
 * Abstract Area Light class that servers as parent for all Area Lights implementations.
 * The light is emitted from the area in the -Z direction.
 */
export declare abstract class AreaLight extends Light {
    /**
     * Area Light position.
     */
    position: Vector3;
    /**
     * Creates a area light object.
     * Documentation : https://doc.babylonjs.com/features/featuresDeepDive/lights/lights_introduction
     * @param name The friendly name of the light
     * @param position The position of the area light.
     * @param scene The scene the light belongs to
     */
    constructor(name: string, position: Vector3, scene?: Scene);
    transferTexturesToEffect(effect: Effect): Light;
    /**
     * Prepares the list of defines specific to the light type.
     * @param defines the list of defines
     * @param lightIndex defines the index of the light for the effect
     */
    prepareLightSpecificDefines(defines: any, lightIndex: number): void;
    _isReady(): boolean;
}
