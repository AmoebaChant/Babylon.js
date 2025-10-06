import { Constants } from "../Engines/constants.js";
/**
 * Contains all parameters needed for the prepass to perform
 * screen space reflections
 */
export class ScreenSpaceReflections2Configuration {
    /**
     * @param useScreenspaceDepth If the effect should use the screenspace depth texture instead of a linear one
     */
    constructor(useScreenspaceDepth = false) {
        /**
         * Is ssr enabled
         */
        this.enabled = false;
        /**
         * Name of the configuration
         */
        this.name = "screenSpaceReflections2";
        /**
         * Textures that should be present in the MRT for this effect to work
         */
        this.texturesRequired = [Constants.PREPASS_NORMAL_TEXTURE_TYPE, Constants.PREPASS_REFLECTIVITY_TEXTURE_TYPE];
        this.texturesRequired.push(useScreenspaceDepth ? Constants.PREPASS_SCREENSPACE_DEPTH_TEXTURE_TYPE : Constants.PREPASS_DEPTH_TEXTURE_TYPE);
    }
}
//# sourceMappingURL=screenSpaceReflections2Configuration.js.map