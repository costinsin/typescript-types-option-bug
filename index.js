import ts from "typescript";
import path from "path";

// The directory path to the TS project 
const cwd = "target-ts-project"

// Reading the config file from `${cwd}/tsconfig.json`
const configFile = ts.readConfigFile(path.join(cwd, "tsconfig.json"), ts.sys.readFile);

// My fix is forcing the type roots to `node_modules/@types`
// if (configFile.config?.compilerOptions !== undefined) {
// 	configFile.config.compilerOptions.typeRoots = ["node_modules/@types"];
// }

// Parsing the config file with `cwd` as basePath
const config = ts.parseJsonConfigFileContent(configFile.config, ts.sys, cwd);
console.dir(config.options, { depth: null })

// Creating the program
const program = ts.createProgram({
	rootNames: config.fileNames,
	options: config.options,
});

// Showing the diagnostics
const diagnostics = ts.getPreEmitDiagnostics(program);
console.dir(diagnostics.map(e => e.messageText), { depth: null })