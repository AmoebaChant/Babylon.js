/* eslint-disable no-console */
import * as fs from "fs";
import * as path from "path";
import { checkDirectorySync, checkArgs, getHashOfFile, getHashOfContent } from "./utils.js";
// import * as glob from "glob";
// import * as chokidar from "chokidar";
// import { DevPackageName } from "./packageMapping";
/**
 * This module is used to build shaders.
 * Arguments:
 * * --isCore - defines that the shaders are part of the core library
 * * --package Package name - from which package should the core shaders be loaded. Defaults to @dev/core
 */

/**
 * Template creating hidden ts file containing the shaders.
 * When moving to pure es6 we will need to remove the Shader assignment
 */
const TsShaderTemplate = `// Do not edit.
import { ShaderStore } from "##SHADERSTORELOCATION_PLACEHOLDER##";
##INCLUDES_PLACEHOLDER##
const name = "##NAME_PLACEHOLDER##";
const shader = \`##SHADER_PLACEHOLDER##\`;
// Sideeffect
if (!ShaderStore.##SHADERSTORE_PLACEHOLDER##[name]) {
    ShaderStore.##SHADERSTORE_PLACEHOLDER##[name] = shader;
}
##EXPORT_PLACEHOLDER##
`;

/**
 * Get the shaders name from their path.
 * @param filename
 * @returns the shader name
 */
function GetShaderName(filename: string) {
    const parts = filename.split(".");
    if (parts[1] !== "fx") {
        return parts[0] + (parts[1] === "fragment" ? "Pixel" : parts[1] === "compute" ? "Compute" : "Vertex") + "Shader";
    } else {
        return parts[0];
    }
}

/**
 * Get the shaders included in the current one to generate to proper imports.
 * @param sourceCode
 * @returns the includes
 */
function GetIncludes(sourceCode: string) {
    const regex = /#include<(.+)>(\((.*)\))*(\[(.*)\])*/g;
    let match = regex.exec(sourceCode);

    const includes = new Set();

    while (match != null) {
        let includeFile = match[1];

        // Uniform declaration
        if (includeFile.indexOf("__decl__") !== -1) {
            includeFile = includeFile.replace(/__decl__/, "");

            // Add non UBO import
            const noUBOFile = includeFile + "Declaration";
            includes.add(noUBOFile);

            includeFile = includeFile.replace(/Vertex/, "Ubo");
            includeFile = includeFile.replace(/Fragment/, "Ubo");
            const uBOFile = includeFile + "Declaration";
            includes.add(uBOFile);
        } else {
            includes.add(includeFile);
        }

        match = regex.exec(sourceCode);
    }

    return includes;
}

/**
 * Generate a ts file per shader file.
 * @param filePath
 * @param basePackageName
 * @param isCore
 */
export function BuildShader(filePath: string, basePackageName: string = "core", isCore?: boolean | string) {
    const isVerbose = checkArgs("--verbose", true);
    isVerbose && console.log("Generating shaders for " + filePath);
    const content = fs.readFileSync(filePath, "utf8");
    const filename = path.basename(filePath);
    const normalized = path.normalize(filePath);
    const directory = path.dirname(normalized);
    const isWGSL = directory.indexOf("WGSL") > -1;
    const tsFilename = filename.replace(".fx", ".ts").replace(".wgsl", ".ts");
    const shaderName = GetShaderName(filename);
    const appendDirName = isWGSL ? "WGSL" : "";
    let fxData = content.toString();

    if (checkArgs("--global", true)) {
        isCore = filePath.includes(path.sep + "core" + path.sep) || filePath.includes("/core/");
    }

    // Remove Trailing whitespace...
    fxData = fxData
        .replace(/^\uFEFF/, "")
        .replace(/\r\n/g, "\n")
        .replace(/(\/\/)+.*$/gm, "")
        .replace(/\t+/gm, " ")
        .replace(/^\s+/gm, "")
        // eslint-disable-next-line no-useless-escape
        .replace(/ ([\*\/\=\+\-\>\<]+) /g, "$1")
        .replace(/,[ ]/g, ",")
        .replace(/ {1,}/g, " ")
        // .replace(/;\s*/g, ";")
        .replace(/^#(.*)/gm, "#$1\n")
        .replace(/\{\n([^#])/g, "{$1")
        .replace(/\n\}/g, "}")
        .replace(/^(?:[\t ]*(?:\r?\n|\r))+/gm, "")
        .replace(/;\n([^#])/g, ";$1");

    // Generate imports for includes.
    let includeText = "";
    const includes = GetIncludes(fxData);
    includes.forEach((entry) => {
        if (isCore) {
            includeText =
                includeText +
                `import "./ShadersInclude/${entry}";
`;
        } else {
            includeText =
                includeText +
                `import "${basePackageName}/Shaders/ShadersInclude/${entry}";
`;
        }
    });

    // Chose shader store.
    const isInclude = directory.indexOf("ShadersInclude") > -1;
    const shaderStore = isInclude ? `IncludesShadersStore${appendDirName}` : `ShadersStore${appendDirName}`;
    let shaderStoreLocation;
    if (isCore) {
        if (isInclude) {
            shaderStoreLocation = "../../Engines/shaderStore";
            includeText = includeText.replace(/ShadersInclude\//g, "");
        } else {
            shaderStoreLocation = "../Engines/shaderStore";
        }
    } else {
        shaderStoreLocation = basePackageName + "/Engines/shaderStore";
    }

    // Fill template in.
    let tsContent = TsShaderTemplate.replace("##SHADERSTORELOCATION_PLACEHOLDER##", shaderStoreLocation);
    tsContent = tsContent
        .replace("##INCLUDES_PLACEHOLDER##", includeText)
        .replace("##NAME_PLACEHOLDER##", shaderName)
        .replace("##SHADER_PLACEHOLDER##", fxData)
        .replace(new RegExp("##SHADERSTORE_PLACEHOLDER##", "g"), shaderStore)
        .replace(
            "##EXPORT_PLACEHOLDER##",
            `/** @internal */
export const ${shaderName + (isWGSL ? "WGSL" : "")} = { name, shader };`
        );

    // Go to disk.
    const tsShaderFilename = path.join(directory, tsFilename);
    checkDirectorySync(path.dirname(tsShaderFilename));
    // check hash
    if (fs.existsSync(tsShaderFilename)) {
        const hash = getHashOfFile(tsShaderFilename);
        const newHash = getHashOfContent(tsContent);
        if (hash === newHash) {
            return;
        }
    }
    fs.writeFileSync(tsShaderFilename, tsContent);
    isVerbose && console.log("Generated " + tsShaderFilename);
}
