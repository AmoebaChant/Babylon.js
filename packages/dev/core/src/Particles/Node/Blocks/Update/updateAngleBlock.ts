import { RegisterClass } from "../../../../Misc/typeStore";
import { NodeParticleBlockConnectionPointTypes } from "../../Enums/nodeParticleBlockConnectionPointTypes";
import { NodeParticleBlock } from "../../nodeParticleBlock";
import type { NodeParticleConnectionPoint } from "../../nodeParticleBlockConnectionPoint";
import type { NodeParticleBuildState } from "../../nodeParticleBuildState";
import type { ThinParticleSystem } from "core/Particles/thinParticleSystem";
import type { Particle } from "core/Particles/particle";
import { _ConnectAtTheEnd } from "core/Particles/Queue/executionQueue";

/**
 * Block used to update the angle of a particle
 */
export class UpdateAngleBlock extends NodeParticleBlock {
    /**
     * Create a new UpdateAngleBlock
     * @param name defines the block name
     */
    public constructor(name: string) {
        super(name);

        this.registerInput("particle", NodeParticleBlockConnectionPointTypes.Particle);
        this.registerInput("angle", NodeParticleBlockConnectionPointTypes.Float);
        this.registerOutput("output", NodeParticleBlockConnectionPointTypes.Particle);
    }

    /**
     * Gets the particle component
     */
    public get particle(): NodeParticleConnectionPoint {
        return this._inputs[0];
    }

    /**
     * Gets the angle input component
     */
    public get angle(): NodeParticleConnectionPoint {
        return this._inputs[1];
    }

    /**
     * Gets the output component
     */
    public get output(): NodeParticleConnectionPoint {
        return this._outputs[0];
    }

    /**
     * Gets the current class name
     * @returns the class name
     */
    public override getClassName() {
        return "UpdateAngleBlock";
    }

    /**
     * Builds the block
     * @param state defines the current build state
     */
    public override _build(state: NodeParticleBuildState) {
        const system = this.particle.getConnectedValue(state) as ThinParticleSystem;

        this.output._storedValue = system;

        if (!this.angle.isConnected) {
            return;
        }

        const processAngle = (particle: Particle) => {
            state.particleContext = particle;
            state.systemContext = system;
            particle.angle = this.angle.getConnectedValue(state);
        };

        const angleProcessing = {
            process: processAngle,
            previousItem: null,
            nextItem: null,
        };

        if (system._updateQueueStart) {
            _ConnectAtTheEnd(angleProcessing, system._updateQueueStart);
        } else {
            system._updateQueueStart = angleProcessing;
        }
    }
}

RegisterClass("BABYLON.UpdateAngleBlock", UpdateAngleBlock);
