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
             * A stack of human readable names of the previous levels of the trim configuration objects.
             */
            const stackOfNames: string[] = [];

            const visitor = (node: ts.Node): ts.Node | undefined => {
                let pushedOntoStack: boolean = false;
                let shouldVisitChildren: boolean = false;

                if (ts.isClassDeclaration(node)) {
                    const name = node.name?.escapedText;

                    if (name) {
                        if (trimConfig[name]) {
                            if (verbose) {
                                console.log("Visiting class:", name);
                            }
                            stackOfNames.push(name.toString());
                            pushedOntoStack = true;
                            shouldVisitChildren = true;
                        } else {
                            // This class doesn't exist in the configuration data, don't bother visiting its children
                            if (verbose) {
                                console.log("Skipping class:", name);
                            }
                            return node;
                        }
                    }
                } else if (ts.isMethodDeclaration(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name) && shouldRemoveNode(trimConfig, stackOfNames, name.escapedText.toString())) {
                        if (verbose) {
                            console.log("Removing method:", [...stackOfNames, name.escapedText.toString()].join("."));
                        }
                        return undefined;
                    }
                } else if (ts.isPropertyDeclaration(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name) && shouldRemoveNode(trimConfig, stackOfNames, name.escapedText.toString())) {
                        if (verbose) {
                            console.log("Removing property:", [...stackOfNames, name.escapedText.toString()].join("."));
                        }
                        return undefined;
                    }
                } else if (ts.isGetAccessor(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name) && shouldRemoveNode(trimConfig, stackOfNames, name.escapedText.toString())) {
                        if (verbose) {
                            console.log("Removing get accessor:", [...stackOfNames, name.escapedText.toString()].join("."));
                        }
                        return undefined;
                    }
                } else if (ts.isSetAccessor(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name) && shouldRemoveNode(trimConfig, stackOfNames, name.escapedText.toString())) {
                        if (verbose) {
                            console.log("Removing set accessor:", [...stackOfNames, name.escapedText.toString()].join("."));
                        }
                        return undefined;
                    }
                }

                // Either visit the children or return this node as-is
                const toReturn = shouldVisitChildren ? ts.visitEachChild(node, visitor, context) : node;

                if (verbose && ts.isClassDeclaration(node)) {
                    console.log("Done visiting class:", node.name?.escapedText);
                }
                if (pushedOntoStack) {
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

function shouldRemoveNode(trimConfig: any, path: string[], nodeName: string): boolean {
    let currentLevel = trimConfig;

    for (const segment of path) {
        if (currentLevel[segment]) {
            currentLevel = currentLevel[segment];
        } else {
            return false;
        }
    }

    // If currentLevel is an array, return true if it contains NodeName
    if (Array.isArray(currentLevel)) {
        return currentLevel.includes(nodeName);
    }

    return false;
}
