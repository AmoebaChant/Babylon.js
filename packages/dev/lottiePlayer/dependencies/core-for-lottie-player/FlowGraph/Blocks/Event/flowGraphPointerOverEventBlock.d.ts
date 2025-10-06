import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import { FlowGraphEventBlock } from "core-for-lottie-player/FlowGraph/flowGraphEventBlock.js";
import { FlowGraphEventType } from "core-for-lottie-player/FlowGraph/flowGraphEventType.js";
import { FlowGraphBlockNames } from "../flowGraphBlockNames.js";
import type { AbstractMesh } from "core-for-lottie-player/Meshes/abstractMesh.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
import type { IFlowGraphBlockConfiguration } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
/**
 * Configuration for the pointer over event block.
 */
export interface IFlowGraphPointerOverEventBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * Should this mesh block propagation of the event.
     */
    stopPropagation?: boolean;
    /**
     * The mesh to listen to. Can also be set by the asset input.
     */
    targetMesh?: AbstractMesh;
}
/**
 * Payload for the pointer over event.
 */
export interface IFlowGraphPointerOverEventPayload {
    /**
     * The pointer id.
     */
    pointerId: number;
    /**
     * The mesh that was picked.
     */
    mesh: AbstractMesh;
    /**
     * If populated, the hover event moved from this mesh to the `mesh` variable
     */
    out?: AbstractMesh;
}
/**
 * A pointer over event block.
 * This block can be used as an entry pointer to when a pointer is over a specific target mesh.
 */
export declare class FlowGraphPointerOverEventBlock extends FlowGraphEventBlock {
    /**
     * Output connection: The pointer id.
     */
    readonly pointerId: FlowGraphDataConnection<number>;
    /**
     * Input connection: The mesh to listen to.
     */
    readonly targetMesh: FlowGraphDataConnection<AbstractMesh>;
    /**
     * Output connection: The mesh that is under the pointer.
     */
    readonly meshUnderPointer: FlowGraphDataConnection<AbstractMesh>;
    readonly type: FlowGraphEventType;
    constructor(config?: IFlowGraphPointerOverEventBlockConfiguration);
    _executeEvent(context: FlowGraphContext, payload: IFlowGraphPointerOverEventPayload): boolean;
    _preparePendingTasks(_context: FlowGraphContext): void;
    _cancelPendingTasks(_context: FlowGraphContext): void;
    getClassName(): FlowGraphBlockNames;
}
