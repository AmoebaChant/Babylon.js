import type { Scene } from "core-for-lottie-player/scene.js";
import type { Vector3 } from "core-for-lottie-player/Maths/math.vector.js";
import type { SystemBlock } from "../systemBlock.js";
import type { ParticleSystem } from "core-for-lottie-player/Particles/particleSystem.js";
/**
 * @internal
 * Tools for managing particle triggers and sub-emitter systems.
 */
export declare function _TriggerSubEmitter(template: SystemBlock, scene: Scene, location: Vector3): ParticleSystem;
