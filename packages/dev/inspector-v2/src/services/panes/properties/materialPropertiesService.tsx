import type { ServiceDefinition } from "../../../modularity/serviceDefinition";
import type { IPropertiesService } from "./propertiesService";
import type { ISelectionService } from "../../selectionService";

import { PropertiesServiceIdentity } from "./propertiesService";
import { SelectionServiceIdentity } from "../../selectionService";

import { Material } from "core/Materials/material";
import { MaterialGeneralProperties, MaterialStencilProperties, MaterialTransparencyProperties } from "../../../components/properties/materials/materialProperties";
import { StandardMaterial } from "core/Materials/standardMaterial";
import { StandardMaterialLightingAndColorProperties } from "../../../components/properties/materials/standardMaterialLightingAndColorProperties";
<<<<<<< HEAD
import { PBRMaterial } from "core/Materials/PBR/pbrMaterial";
import { PBRMaterialLightingAndColorProperties } from "../../../components/properties/materials/pbrMaterialLightingAndColorProperties";
=======
>>>>>>> master

export const MaterialPropertiesServiceDefinition: ServiceDefinition<[], [IPropertiesService, ISelectionService]> = {
    friendlyName: "Material Properties",
    consumes: [PropertiesServiceIdentity, SelectionServiceIdentity],
    factory: (propertiesService) => {
        const materialContentRegistration = propertiesService.addSectionContent({
            key: "Material Properties",
            predicate: (entity: unknown) => entity instanceof Material,
            content: [
                {
                    section: "General",
                    component: ({ context }) => <MaterialGeneralProperties material={context} />,
                },
                {
                    section: "Transparency",
                    component: ({ context }) => <MaterialTransparencyProperties material={context} />,
                },
                {
                    section: "Stencil",
                    component: ({ context }) => <MaterialStencilProperties material={context} />,
                },
            ],
        });

        const standardMaterialContentRegistration = propertiesService.addSectionContent({
            key: "Standard Material Properties",
            predicate: (entity: unknown) => entity instanceof StandardMaterial,
            content: [
                {
                    section: "Lighting & Colors",
                    component: ({ context }) => <StandardMaterialLightingAndColorProperties standardMaterial={context} />,
                },
            ],
        });

<<<<<<< HEAD
        const pbrMaterialContentRegistration = propertiesService.addSectionContent({
            key: "PBR Material Properties",
            predicate: (entity: unknown) => entity instanceof PBRMaterial,
            content: [
                {
                    section: "Lighting & Colors",
                    component: ({ context }) => <PBRMaterialLightingAndColorProperties pbrMaterial={context} />,
                },
            ],
        });

=======
>>>>>>> master
        return {
            dispose: () => {
                materialContentRegistration.dispose();
                standardMaterialContentRegistration.dispose();
<<<<<<< HEAD
                pbrMaterialContentRegistration.dispose();
=======
>>>>>>> master
            },
        };
    },
};
