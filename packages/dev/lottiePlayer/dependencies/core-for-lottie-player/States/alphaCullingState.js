import { Constants } from "core-for-lottie-player/Engines/constants.js";
/**
 * @internal
 **/
export class AlphaState {
    /**
     * Initializes the state.
     * @param _supportBlendParametersPerTarget - Whether blend parameters per target is supported
     */
    constructor(_supportBlendParametersPerTarget) {
        this._supportBlendParametersPerTarget = _supportBlendParametersPerTarget;
        this._blendFunctionParameters = new Array(4 * 8);
        this._blendEquationParameters = new Array(2 * 8);
        this._blendConstants = new Array(4);
        this._isBlendConstantsDirty = false;
        this._alphaBlend = Array(8).fill(false);
        this._numTargetEnabled = 0;
        this._isAlphaBlendDirty = false;
        this._isBlendFunctionParametersDirty = false;
        this._isBlendEquationParametersDirty = false;
        this.reset();
    }
    get isDirty() {
        return this._isAlphaBlendDirty || this._isBlendFunctionParametersDirty || this._isBlendEquationParametersDirty;
    }
    get alphaBlend() {
        return this._numTargetEnabled > 0;
    }
    setAlphaBlend(value, targetIndex = 0) {
        if (this._alphaBlend[targetIndex] === value) {
            return;
        }
        if (value) {
            this._numTargetEnabled++;
        }
        else {
            this._numTargetEnabled--;
        }
        this._alphaBlend[targetIndex] = value;
        this._isAlphaBlendDirty = true;
    }
    setAlphaBlendConstants(r, g, b, a) {
        if (this._blendConstants[0] === r && this._blendConstants[1] === g && this._blendConstants[2] === b && this._blendConstants[3] === a) {
            return;
        }
        this._blendConstants[0] = r;
        this._blendConstants[1] = g;
        this._blendConstants[2] = b;
        this._blendConstants[3] = a;
        this._isBlendConstantsDirty = true;
    }
    setAlphaBlendFunctionParameters(srcRGBFactor, dstRGBFactor, srcAlphaFactor, dstAlphaFactor, targetIndex = 0) {
        const offset = targetIndex * 4;
        if (this._blendFunctionParameters[offset + 0] === srcRGBFactor &&
            this._blendFunctionParameters[offset + 1] === dstRGBFactor &&
            this._blendFunctionParameters[offset + 2] === srcAlphaFactor &&
            this._blendFunctionParameters[offset + 3] === dstAlphaFactor) {
            return;
        }
        this._blendFunctionParameters[offset + 0] = srcRGBFactor;
        this._blendFunctionParameters[offset + 1] = dstRGBFactor;
        this._blendFunctionParameters[offset + 2] = srcAlphaFactor;
        this._blendFunctionParameters[offset + 3] = dstAlphaFactor;
        this._isBlendFunctionParametersDirty = true;
    }
    setAlphaEquationParameters(rgbEquation, alphaEquation, targetIndex = 0) {
        const offset = targetIndex * 2;
        if (this._blendEquationParameters[offset + 0] === rgbEquation && this._blendEquationParameters[offset + 1] === alphaEquation) {
            return;
        }
        this._blendEquationParameters[offset + 0] = rgbEquation;
        this._blendEquationParameters[offset + 1] = alphaEquation;
        this._isBlendEquationParametersDirty = true;
    }
    reset() {
        this._alphaBlend.fill(false);
        this._numTargetEnabled = 0;
        this._blendFunctionParameters.fill(null);
        this._blendEquationParameters.fill(null);
        this._blendConstants[0] = null;
        this._blendConstants[1] = null;
        this._blendConstants[2] = null;
        this._blendConstants[3] = null;
        this._isAlphaBlendDirty = true;
        this._isBlendFunctionParametersDirty = false;
        this._isBlendEquationParametersDirty = false;
        this._isBlendConstantsDirty = false;
    }
    apply(gl, numTargets = 1) {
        if (!this.isDirty) {
            return;
        }
        // Constants
        if (this._isBlendConstantsDirty) {
            gl.blendColor(this._blendConstants[0], this._blendConstants[1], this._blendConstants[2], this._blendConstants[3]);
            this._isBlendConstantsDirty = false;
        }
        if (numTargets === 1 || !this._supportBlendParametersPerTarget) {
            // Single target or no support for per-target parameters
            if (this._isAlphaBlendDirty) {
                if (this._alphaBlend[0]) {
                    gl.enable(gl.BLEND);
                }
                else {
                    gl.disable(gl.BLEND);
                }
                this._isAlphaBlendDirty = false;
            }
            if (this._isBlendFunctionParametersDirty) {
                gl.blendFuncSeparate(this._blendFunctionParameters[0], this._blendFunctionParameters[1], this._blendFunctionParameters[2], this._blendFunctionParameters[3]);
                this._isBlendFunctionParametersDirty = false;
            }
            if (this._isBlendEquationParametersDirty) {
                gl.blendEquationSeparate(this._blendEquationParameters[0], this._blendEquationParameters[1]);
                this._isBlendEquationParametersDirty = false;
            }
            return;
        }
        // Multi-target
        const gl2 = gl;
        // Alpha blend
        if (this._isAlphaBlendDirty) {
            for (let i = 0; i < numTargets; i++) {
                const index = i < this._numTargetEnabled ? i : 0;
                if (this._alphaBlend[index]) {
                    gl2.enableIndexed(gl.BLEND, i);
                }
                else {
                    gl2.disableIndexed(gl.BLEND, i);
                }
            }
            this._isAlphaBlendDirty = false;
        }
        // Alpha function
        if (this._isBlendFunctionParametersDirty) {
            for (let i = 0; i < numTargets; i++) {
                const offset = i < this._numTargetEnabled ? i * 4 : 0;
                gl2.blendFuncSeparateIndexed(i, this._blendFunctionParameters[offset + 0], this._blendFunctionParameters[offset + 1], this._blendFunctionParameters[offset + 2], this._blendFunctionParameters[offset + 3]);
            }
            this._isBlendFunctionParametersDirty = false;
        }
        // Alpha equation
        if (this._isBlendEquationParametersDirty) {
            for (let i = 0; i < numTargets; i++) {
                const offset = i < this._numTargetEnabled ? i * 2 : 0;
                gl2.blendEquationSeparateIndexed(i, this._blendEquationParameters[offset + 0], this._blendEquationParameters[offset + 1]);
            }
            this._isBlendEquationParametersDirty = false;
        }
    }
    setAlphaMode(mode, targetIndex) {
        let equation = Constants.GL_ALPHA_EQUATION_ADD;
        switch (mode) {
            case Constants.ALPHA_DISABLE:
                break;
            case Constants.ALPHA_PREMULTIPLIED:
                this.setAlphaBlendFunctionParameters(1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, 1, 1, targetIndex);
                break;
            case Constants.ALPHA_PREMULTIPLIED_PORTERDUFF:
                this.setAlphaBlendFunctionParameters(1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, 1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_COMBINE:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_SRC_ALPHA, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, 1, 1, targetIndex);
                break;
            case Constants.ALPHA_ONEONE:
                this.setAlphaBlendFunctionParameters(1, 1, 0, 1, targetIndex);
                break;
            case Constants.ALPHA_ADD:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_SRC_ALPHA, 1, 0, 1, targetIndex);
                break;
            case Constants.ALPHA_SUBTRACT:
                this.setAlphaBlendFunctionParameters(0, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR, 1, 1, targetIndex);
                equation = Constants.GL_ALPHA_EQUATION_SUBTRACT;
                break;
            case Constants.ALPHA_MULTIPLY:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_DST_COLOR, 0, 1, 1, targetIndex);
                break;
            case Constants.ALPHA_MAXIMIZED:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_SRC_ALPHA, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR, 1, 1, targetIndex);
                break;
            case Constants.ALPHA_INTERPOLATE:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_CONSTANT_COLOR, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_COLOR, Constants.GL_ALPHA_FUNCTION_CONSTANT_ALPHA, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_CONSTANT_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_SCREENMODE:
                this.setAlphaBlendFunctionParameters(1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR, 1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_ONEONE_ONEONE:
                this.setAlphaBlendFunctionParameters(1, 1, 1, 1, targetIndex);
                break;
            case Constants.ALPHA_ALPHATOCOLOR:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_DST_ALPHA, 1, 0, 0, targetIndex);
                break;
            case Constants.ALPHA_REVERSEONEMINUS:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_ONE_MINUS_DST_COLOR, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_DST_ALPHA, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_SRC_DSTONEMINUSSRCALPHA:
                this.setAlphaBlendFunctionParameters(1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, 1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_ONEONE_ONEZERO:
                this.setAlphaBlendFunctionParameters(1, 1, 1, 0, targetIndex);
                break;
            case Constants.ALPHA_EXCLUSION:
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_ONE_MINUS_DST_COLOR, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_COLOR, 0, 1, targetIndex);
                break;
            case Constants.ALPHA_LAYER_ACCUMULATE:
                // Same as ALPHA_COMBINE but accumulates (1 - alpha) values in the alpha channel for a later readout in order independant transparency
                this.setAlphaBlendFunctionParameters(Constants.GL_ALPHA_FUNCTION_SRC_ALPHA, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, 1, Constants.GL_ALPHA_FUNCTION_ONE_MINUS_SRC_ALPHA, targetIndex);
                break;
            case Constants.ALPHA_MIN:
                this.setAlphaBlendFunctionParameters(1, 1, 1, 1, targetIndex);
                equation = Constants.GL_ALPHA_EQUATION_MIN;
                break;
            case Constants.ALPHA_MAX:
                this.setAlphaBlendFunctionParameters(1, 1, 1, 1, targetIndex);
                equation = Constants.GL_ALPHA_EQUATION_MAX;
                break;
            case Constants.ALPHA_DUAL_SRC0_ADD_SRC1xDST:
                this.setAlphaBlendFunctionParameters(1, Constants.GL_ALPHA_FUNCTION_SRC1_COLOR, 0, 1, targetIndex);
                break;
        }
        this.setAlphaEquationParameters(equation, equation, targetIndex);
    }
}
//# sourceMappingURL=alphaCullingState.js.map