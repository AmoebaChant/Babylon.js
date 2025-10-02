/* eslint-disable no-console */
import * as ts from "typescript";
import * as fs from "fs";

/**
 * Get a TypeScript transformer that trims unused code based on the provided configuration file.
 * @param configFileName - Path to the trim configuration file.
 * @param verbose - Whether to log verbose output.
 * @returns A TypeScript transformer factory.
 */
export function GetTrimTransformerFactory(configFileName: string, verbose: boolean) {
    // Read in JSON from _configFile
    const configFileContents = fs.readFileSync(configFileName, "utf8");
    const trimConfig = JSON.parse(configFileContents);

    const trimTransformerFactory: ts.TransformerFactory<ts.SourceFile> = (context) => {
        return (sourceFile: ts.SourceFile) => {
            /**
             * A stack of the previous levels of trim configuration objects.
             */
            const previousLevelsOfTrimConfig: {}[] = [];

            /**
             * The current level of the trim configuration object.
             */
            let currentLevelOfTrimConfig = trimConfig;

            /**
             * A stack of human readable names of the previous levels of the trim configuration objects.
             */
            const stackOfNames: string[] = [];

            const visitor = (node: ts.Node): ts.Node | undefined => {
                let pushedOntoStack: boolean = false;

                if (ts.isClassDeclaration(node)) {
                    const name = node.name?.escapedText;

                    if (name) {
                        if (currentLevelOfTrimConfig[name]) {
                            previousLevelsOfTrimConfig.push(currentLevelOfTrimConfig);
                            currentLevelOfTrimConfig = currentLevelOfTrimConfig[name];
                            if (verbose) {
                                console.log("Visiting class:", name);
                            }
                            stackOfNames.push(name.toString());
                            pushedOntoStack = true;
                        } else {
                            // This class doesn't exist in the configuration data, don't bother visiting its children
                            if (verbose) {
                                console.log("Skipping class:", name);
                            }
                            return node;
                        }
                    }
                }

                if (ts.isMethodDeclaration(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name)) {
                        if (currentLevelOfTrimConfig[name.escapedText.toString()] === true) {
                            console.log("Removing method:", [...stackOfNames, name.escapedText.toString()].join("."));
                            return undefined;
                        }
                    }
                }

                const toReturn = ts.visitEachChild(node, visitor, context);
                if (verbose && ts.isClassDeclaration(node)) {
                    console.log("Done visiting class:", node.name?.escapedText);
                }
                if (pushedOntoStack) {
                    currentLevelOfTrimConfig = previousLevelsOfTrimConfig.pop();
                    stackOfNames.pop();
                }
                return toReturn;
            };

            const sourceFileVisitor = (sourceFile: ts.SourceFile): ts.SourceFile => {
                return ts.visitEachChild(sourceFile, visitor, context);
            };

            return ts.visitNode(sourceFile, sourceFileVisitor, ts.isSourceFile);
        };
    };

    return trimTransformerFactory;
}
