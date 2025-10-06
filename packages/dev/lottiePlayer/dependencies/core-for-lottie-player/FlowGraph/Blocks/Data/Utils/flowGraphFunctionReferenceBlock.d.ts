import type { IFlowGraphBlockConfiguration } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import { FlowGraphBlock } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
/**
 * A flow graph block that takes a function name, an object and an optional context as inputs and calls the function on the object.
 */
export declare class FlowGraphFunctionReferenceBlock extends FlowGraphBlock {
    /**
     * Input: The function name.
     */
    readonly functionName: FlowGraphDataConnection<string>;
    /**
     * Input: The object to get the function from.
     * This can be a constructed class or a collection of stand-alone functions.
     */
    readonly object: FlowGraphDataConnection<any>;
    /**
     * Input: The context to call the function with.
     * This is optional. If not provided, the function will be bound to null.
     */
    readonly context: FlowGraphDataConnection<any>;
    /**
     * Output: The function referenced by functionName from the object, bound to the context.
     */
    readonly output: FlowGraphDataConnection<Function>;
    constructor(
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
