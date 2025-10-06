import { FlowGraphBlock } from "core-for-lottie-player/FlowGraph/flowGraphBlock.js";
import { RichTypeAny } from "core-for-lottie-player/FlowGraph/flowGraphRichTypes.js";
import { RegisterClass } from "core-for-lottie-player/Misc/typeStore.js";
import { FlowGraphInteger } from "core-for-lottie-player/FlowGraph/CustomTypes/flowGraphInteger.js";
import { getNumericValue } from "core-for-lottie-player/FlowGraph/utils.js";
/**
 * This simple Util block takes an array as input and selects a single element from it.
 */
export class FlowGraphArrayIndexBlock extends FlowGraphBlock {
    /**
     * Construct a FlowGraphArrayIndexBlock.
     * @param config construction parameters
     */
    constructor(config) {
        super(config);
        this.config = config;
        this.array = this.registerDataInput("array", RichTypeAny);
        this.index = this.registerDataInput("index", RichTypeAny, new FlowGraphInteger(-1));
        this.value = this.registerDataOutput("value", RichTypeAny);
    }
    /**
     * @internal
     */
    _updateOutputs(context) {
        const array = this.array.getValue(context);
        const index = getNumericValue(this.index.getValue(context));
        if (array && index >= 0 && index < array.length) {
            this.value.setValue(array[index], context);
        }
        else {
            this.value.setValue(null, context);
        }
    }
    /**
     * Serializes this block
     * @param serializationObject the object to serialize to
     */
    serialize(serializationObject) {
        super.serialize(serializationObject);
    }
    getClassName() {
        return "FlowGraphArrayIndexBlock" /* FlowGraphBlockNames.ArrayIndex */;
    }
}
RegisterClass("FlowGraphArrayIndexBlock" /* FlowGraphBlockNames.ArrayIndex */, FlowGraphArrayIndexBlock);
//# sourceMappingURL=flowGraphArrayIndexBlock.js.map