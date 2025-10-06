import type { EasingFunction } from "core-for-lottie-player/Animations/easing.js";
import type { IFlowGraphBlockConfiguration } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import { FlowGraphBlock } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import type { FlowGraphContext } from "core-for-lottie-player/FlowGraph/flowGraphContext.js";
import type { FlowGraphDataConnection } from "core-for-lottie-player/FlowGraph/flowGraphDataConnection.js";
import type { Vector2 } from "core-for-lottie-player/Maths/math.vector.js";
/**
 * An easing block that generates a BezierCurveEase easingFunction object based on the data provided.
 */
export declare class FlowGraphBezierCurveEasingBlock extends FlowGraphBlock {
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration | undefined;
    /**
     * Input connection: The mode of the easing function.
     * EasingFunction.EASINGMODE_EASEIN, EasingFunction.EASINGMODE_EASEOUT, EasingFunction.EASINGMODE_EASEINOUT
     */
    readonly mode: FlowGraphDataConnection<number>;
    /**
     * Input connection: Control point 1 for bezier curve.
     */
    readonly controlPoint1: FlowGraphDataConnection<Vector2>;
    /**
     * Input connection: Control point 2 for bezier curve.
     */
    readonly controlPoint2: FlowGraphDataConnection<Vector2>;
    /**
     * Output connection: The easing function object.
     */
    readonly easingFunction: FlowGraphDataConnection<EasingFunction>;
    /**
     * Internal cache of reusable easing functions.
     * key is type-mode-properties
     */
    private _easingFunctions;
    constructor(
    /**
     * the configuration of the block
     */
    config?: IFlowGraphBlockConfiguration | undefined);
    _updateOutputs(context: FlowGraphContext): void;
    getClassName(): string;
}
