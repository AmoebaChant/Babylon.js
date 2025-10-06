import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
import type { FlowGraphSignalConnection } from "core-for-lottie-player/FlowGraph/flowGraphSignalConnection.js";
import { FlowGraphExecutionBlockWithOutSignal } from "core-for-lottie-player/FlowGraph/flowGraphExecutionBlockWithOutSignal.js";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock.js";
/**
 * This block debounces the execution of a input, i.e. ensures that the input is only executed once every X times
 */
export declare class FlowGraphDebounceBlock extends FlowGraphExecutionBlockWithOutSignal {
    /**
     * Input: The number of times the input must be executed before the onDone signal is activated
     */
    readonly count: FlowGraphDataConnection<number>;
    /**
     * Input: Resets the debounce counter
     */
    readonly reset: FlowGraphSignalConnection;
    /**
     * Output: The current count of the debounce counter
     */
    readonly currentCount: FlowGraphDataConnection<number>;
    constructor(config?: IFlowGraphBlockConfiguration);
    _execute(context: FlowGraphContext, callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
