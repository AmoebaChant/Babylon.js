/* eslint-disable no-console */
import * as ts from "typescript";

/**
 * Get a TypeScript transformer that trims unused code based on the provided configuration file.
 * @param _configFile - Path to the trim configuration file.
 * @returns A TypeScript transformer factory.
 */
export function GetTrimTransformer(_configFile: string) {
    // TODO: read and use the configFile to customize the transformer behavior

    const trimTransformer: ts.TransformerFactory<ts.SourceFile> = (context) => {
        return (sourceFile) => {
            const visitor = (node: ts.Node): ts.Node | undefined => {
                // If this is a class method named `doSomethingElse`, remove the whole method
                if (ts.isMethodDeclaration(node)) {
                    const name = node.name;
                    if (ts.isIdentifier(name) && name.escapedText === "doSomethingElse") {
                        console.log("Removing method:", name.escapedText);
                        return undefined;
                    }
                }

                if (ts.isIdentifier(node)) {
                    console.log("Visiting identifier:", node.escapedText);
                }

                return ts.visitEachChild(node, visitor, context);
            };

            const sourceFileVisitor = (sourceFile: ts.SourceFile): ts.SourceFile => {
                return ts.visitEachChild(sourceFile, visitor, context);
            };

            return ts.visitNode(sourceFile, sourceFileVisitor, ts.isSourceFile);
        };
    };

    return trimTransformer;
}
