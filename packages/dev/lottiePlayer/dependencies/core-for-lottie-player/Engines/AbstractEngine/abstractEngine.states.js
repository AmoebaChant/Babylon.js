import { AbstractEngine } from "../abstractEngine.js";
import { Constants } from "../constants.js";
import "./abstractEngine.alpha.js";
AbstractEngine.prototype.getInputElement = function () {
    return this._renderingCanvas;
};
AbstractEngine.prototype.getDepthFunction = function () {
    return this._depthCullingState.depthFunc;
};
AbstractEngine.prototype.setDepthFunction = function (depthFunc) {
    this._depthCullingState.depthFunc = depthFunc;
};
AbstractEngine.prototype.setDepthFunctionToGreater = function () {
    this.setDepthFunction(Constants.GREATER);
};
AbstractEngine.prototype.setDepthFunctionToGreaterOrEqual = function () {
    this.setDepthFunction(Constants.GEQUAL);
};
AbstractEngine.prototype.setDepthFunctionToLess = function () {
    this.setDepthFunction(Constants.LESS);
};
AbstractEngine.prototype.setDepthFunctionToLessOrEqual = function () {
    this.setDepthFunction(Constants.LEQUAL);
};
AbstractEngine.prototype.getDepthWrite = function () {
    return this._depthCullingState.depthMask;
};
AbstractEngine.prototype.setDepthWrite = function (enable) {
    this._depthCullingState.depthMask = enable;
};
AbstractEngine.prototype.setAlphaConstants = function (r, g, b, a) {
    this._alphaState.setAlphaBlendConstants(r, g, b, a);
};
AbstractEngine.prototype.getAlphaMode = function (targetIndex = 0) {
    return this._alphaMode[targetIndex];
};
AbstractEngine.prototype.getAlphaEquation = function (targetIndex = 0) {
    return this._alphaEquation[targetIndex];
};
//# sourceMappingURL=abstractEngine.states.js.map