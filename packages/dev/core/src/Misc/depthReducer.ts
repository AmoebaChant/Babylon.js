import type { Nullable } from "../types";
import type { RenderTargetTexture } from "../Materials/Textures/renderTargetTexture";
import type { Camera } from "../Cameras/camera";
import { Constants } from "../Engines/constants";
import { DepthRenderer } from "../Rendering/depthRenderer";

import { MinMaxReducer } from "./minMaxReducer";

/**
 * This class is a small wrapper around the MinMaxReducer class to compute the min/max values of a depth texture
 */
export class DepthReducer extends MinMaxReducer {
    private _depthRenderer: Nullable<DepthRenderer>;
    private _depthRendererId: string;

    /**
     * Gets the depth renderer used for the computation.
     * Note that the result is null if you provide your own renderer when calling setDepthRenderer.
     */
    public get depthRenderer(): Nullable<DepthRenderer> {
        return this._depthRenderer;
    }

    /**
     * Creates a depth reducer
     * @param camera The camera used to render the depth texture
     */
    constructor(camera: Camera) {
        super(camera);
    }

    /**
     * Sets the depth renderer to use to generate the depth map
     * @param depthRenderer The depth renderer to use. If not provided, a new one will be created automatically
     * @param type The texture type of the depth map (default: TEXTURETYPE_HALF_FLOAT)
     * @param forceFullscreenViewport Forces the post processes used for the reduction to be applied without taking into account viewport (defaults to true)
     */
    public setDepthRenderer(depthRenderer: Nullable<DepthRenderer> = null, type: number = Constants.TEXTURETYPE_HALF_FLOAT, forceFullscreenViewport = true): void {
        const scene = this._camera.getScene();

        if (this._depthRenderer) {
            delete scene._depthRenderer[this._depthRendererId];

            this._depthRenderer.dispose();
            this._depthRenderer = null;
        }

        if (depthRenderer === null) {
            if (!scene._depthRenderer) {
                scene._depthRenderer = {};
            }

            this._depthRendererId = "minmax_" + this._camera.id;

            depthRenderer = this._depthRenderer = new DepthRenderer(
                scene,
                type,
                this._camera,
                false,
                Constants.TEXTURE_NEAREST_SAMPLINGMODE,
                false,
                `DepthRenderer ${this._depthRendererId}`
            );
            depthRenderer.enabled = false;

            scene._depthRenderer[this._depthRendererId] = depthRenderer;
        }

        super.setSourceTexture(depthRenderer.getDepthMap(), true, type, forceFullscreenViewport);
    }

    /**
     * @internal
     */
    public override setSourceTexture(
        sourceTexture: RenderTargetTexture,
        depthRedux: boolean,
        type: number = Constants.TEXTURETYPE_HALF_FLOAT,
        forceFullscreenViewport = true
    ): void {
        super.setSourceTexture(sourceTexture, depthRedux, type, forceFullscreenViewport);
    }

    /**
     * Activates the reduction computation.
     * When activated, the observers registered in onAfterReductionPerformed are
     * called after the computation is performed
     */
    public override activate(): void {
        if (this._depthRenderer) {
            this._depthRenderer.enabled = true;
        }

        super.activate();
    }

    /**
     * Deactivates the reduction computation.
     */
    public override deactivate(): void {
        super.deactivate();

        if (this._depthRenderer) {
            this._depthRenderer.enabled = false;
        }
    }

    /**
     * Disposes the depth reducer
     * @param disposeAll true to dispose all the resources. You should always call this function with true as the parameter (or without any parameter as it is the default one). This flag is meant to be used internally.
     */
    public override dispose(disposeAll = true): void {
        super.dispose(disposeAll);

        if (this._depthRenderer && disposeAll) {
            this._depthRenderer.dispose();
            this._depthRenderer = null;
        }
    }
}
