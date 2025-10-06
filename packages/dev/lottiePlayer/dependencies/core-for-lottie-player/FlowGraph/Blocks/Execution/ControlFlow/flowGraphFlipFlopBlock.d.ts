import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
import { FlowGraphExecutionBlock } from "core-for-lottie-player/FlowGraph/flowGraphExecutionBlock.js";
import type { FlowGraphSignalConnection } from "core-for-lottie-player/FlowGraph/flowGraphSignalConnection.js";
import type { IFlowGraphBlockConfiguration } from "../../../flowGraphBlock.js";
/**
 * Configuration for the flip flop block.
 */
export interface IFlowGraphFlipFlopBlockConfiguration extends IFlowGraphBlockConfiguration {
    /**
     * The starting value of the flip flop switch
     */
    startValue?: boolean;
}
/**
 * This block flip flops between two outputs.
 */
export declare class FlowGraphFlipFlopBlock extends FlowGraphExecutionBlock {
    /**
     * Output connection: The signal to execute when the variable is on.
     */
    readonly onOn: FlowGraphSignalConnection;
    /**
     * Output connection: The signal to execute when the variable is off.
     */
    readonly onOff: FlowGraphSignalConnection;
    /**
     * Output connection: If the variable is on.
     */
    readonly value: FlowGraphDataConnection<boolean>;
    constructor(config?: IFlowGraphFlipFlopBlockConfiguration);
    _execute(context: FlowGraphContext, _callingSignal: FlowGraphSignalConnection): void;
    /**
     * @returns class name of the block.
     */
    getClassName(): string;
}
