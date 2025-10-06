import type { IFlowGraphBlockConfiguration } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import { FlowGraphBlock } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
import type { FlowGraphNumber } from "core-for-lottie-player/FlowGraph/utils.js";
import type { Nullable } from "core-for-lottie-player/types.js";
/**
 * This simple Util block takes an array as input and selects a single element from it.
 */
export declare class FlowGraphArrayIndexBlock<T = any> extends FlowGraphBlock {
    config: IFlowGraphBlockConfiguration;
    /**
     * Input connection: The array to select from.
     */
    readonly array: FlowGraphDataConnection<T[]>;
    /**
     * Input connection: The index to select.
     */
    readonly index: FlowGraphDataConnection<FlowGraphNumber>;
    /**
     * Output connection: The selected element.
     */
    readonly value: FlowGraphDataConnection<Nullable<T>>;
    /**
     * Construct a FlowGraphArrayIndexBlock.
     * @param config construction parameters
     */
    constructor(config: IFlowGraphBlockConfiguration);
    /**
     * @internal
     */
    _updateOutputs(context: FlowGraphContext): void;
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject?: any): void;
    getClassName(): string;
}
