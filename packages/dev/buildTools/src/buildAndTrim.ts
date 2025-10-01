#!/usr/bin/env node
/* eslint-disable no-console */
import * as ts from "typescript";
import * as path from "path";
import { GetTrimTransformer } from "./trim.plugin";
import { checkArgs } from "./utils";

// Load tsconfig.json
function LoadConfig(configPath: string) {
    const configFile = ts.readConfigFile(configPath, ts.sys.readFile);
    if (configFile.error) {
        throw new Error(
            ts.formatDiagnosticsWithColorAndContext([configFile.error], {
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getCanonicalFileName: (f) => f,
                getNewLine: () => ts.sys.newLine,
            })
        );
    }

    // Ensure we write to a separate directory to avoid having this output confused with the non-trimmed output
    configFile.config.compilerOptions.outDir = "./trimmedDist";

    const parsed = ts.parseJsonConfigFileContent(configFile.config, ts.sys, path.dirname(configPath));

    return parsed;
}

// Compile and emit JS
function Compile(configPath: string, trimTransformer: ts.TransformerFactory<ts.SourceFile>) {
    const parsedConfig = LoadConfig(configPath);
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
        console.log("✅ Build with plugin complete!");
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
        console.error(`❌ Error: tsconfig.json file not found at: ${tsConfigPath}`);
        process.exit(1);
    }

    if (typeof trimConfigPath !== "string" || !ts.sys.fileExists(trimConfigPath)) {
        console.error(`❌ Error: trimConfig.json file not found at: ${trimConfigPath}`);
        process.exit(1);
    }

    console.log(`📖 Using tsconfig: ${tsConfigPath}`);
    console.log(`✂️ Using trim config: ${trimConfigPath}`);

    const trimTransformer = GetTrimTransformer(trimConfigPath);

    Compile(tsConfigPath, trimTransformer);
}
