import { Constants } from "../Engines/constants.js";
/**
 * Contains all parameters needed for the prepass to perform
 * screen space reflections
 */
export class ScreenSpaceReflectionsConfiguration {
    constructor() {
        /**
         * Is ssr enabled
         */
        this.enabled = false;
        /**
         * Name of the configuration
         */
        this.name = "screenSpaceReflections";
        /**
         * Textures that should be present in the MRT for this effect to work
         */
        this.texturesRequired = [Constants.PREPASS_NORMAL_TEXTURE_TYPE, Constants.PREPASS_REFLECTIVITY_TEXTURE_TYPE, Constants.PREPASS_POSITION_TEXTURE_TYPE];
    }
}
//# sourceMappingURL=screenSpaceReflectionsConfiguration.js.map