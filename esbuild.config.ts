import child_process from "node:child_process";
import { globSync } from "node:fs";
import fs from "node:fs/promises";
import { promisify } from "node:util";
import { build } from "esbuild";
import { replaceTscAliasPaths } from "tsc-alias";
import { compilerOptions } from "./tsconfig.json";

const execAsync = promisify(child_process.exec);
const entryPoints = globSync("src/**/*.ts");
const { outDir } = compilerOptions;

// clean up old dist
await fs.rm(outDir, { recursive: true, force: true });

// nothing special
await build({
  entryPoints,
  outdir: outDir,
  treeShaking: true,
  platform: "node",
  target: "ESNext",
  sourcemap: false,
  format: "esm",
  minify: false,
  tsconfig: "./tsconfig.json",
});

// create full temp config because tsc-alias doesn't like extended configs
// https://github.com/justkey007/tsc-alias/issues/230
await execAsync("tsc --showConfig > tsconfig.temp.json");

// replace aliases with actual paths and add .js extensions
await replaceTscAliasPaths({
  outDir,
  resolveFullPaths: true,
  configFile: "tsconfig.temp.json",
});

// clean up temp config
await fs.rm("tsconfig.temp.json");
