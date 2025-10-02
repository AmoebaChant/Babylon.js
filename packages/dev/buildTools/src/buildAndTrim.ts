#!/usr/bin/env node
/* eslint-disable no-console */
import * as ts from "typescript";
import * as path from "path";
import { GetTrimTransformer } from "./trim.plugin";
import { checkArgs } from "./utils";

// Load tsconfig.json
function LoadConfig(configFileName: string) {
    const configFileContents = ts.readConfigFile(configFileName, ts.sys.readFile);
    const pathToConfigFile = path.dirname(path.resolve(configFileName));

    if (configFileContents.error) {
        throw new Error(
            ts.formatDiagnosticsWithColorAndContext([configFileContents.error], {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: (f) => f,
                getNewLine: () => ts.sys.newLine,
            })
        );
    }

    const parsed = ts.parseJsonConfigFileContent(configFileContents.config, ts.sys, pathToConfigFile);

    return parsed;
}

// Compile and emit JS
function Compile(configPath: string, trimTransformer: ts.TransformerFactory<ts.SourceFile>) {
    const parsedConfig = LoadConfig(configPath);

    if (parsedConfig.errors.length > 0) {
        for (const error of parsedConfig.errors) {
            console.error(error.messageText);
        }
        return;
    }

    const program = ts.createProgram(parsedConfig.fileNames, parsedConfig.options);

    const emitResult = program.emit(undefined, undefined, undefined, undefined, {
        before: [trimTransformer],
    });

    const diagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
    if (diagnostics.length > 0) {
        console.log(
            ts.formatDiagnosticsWithColorAndContext(diagnostics, {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: (f) => f,
                getNewLine: () => ts.sys.newLine,
            })
        );
    } else {
        console.log("Trimmed build complete!");
    }
}

/**
 * Build the project using the provided tsconfig.json and trim unused code based on the trimConfig.json.
 */
export function BuildAndTrim() {
    const tsConfigPath = checkArgs("--tsConfig");
    const trimConfigPath = checkArgs("--trimConfig");

    // Verify that both files exist
    if (typeof tsConfigPath !== "string" || !ts.sys.fileExists(tsConfigPath)) {
        console.error(`tsconfig.json file not found at: ${tsConfigPath}`);
        process.exit(1);
    }

    if (typeof trimConfigPath !== "string" || !ts.sys.fileExists(trimConfigPath)) {
        console.error(`trimConfig.json file not found at: ${trimConfigPath}`);
        process.exit(1);
    }

    const trimTransformer = GetTrimTransformer(trimConfigPath);

    Compile(tsConfigPath, trimTransformer);
}
