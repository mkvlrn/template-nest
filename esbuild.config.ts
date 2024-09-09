import { rm } from "node:fs/promises";
import { build } from "esbuild";
import { glob } from "glob";
import { replaceTscAliasPaths } from "tsc-alias";
import { compilerOptions } from "./tsconfig.json";

const entryPoints = await glob("src/**/*.ts");
const { outDir } = compilerOptions;

// clean
await rm(outDir, { recursive: true, force: true });

// nothing special
await build({
  entryPoints,
  outdir: outDir,
  treeShaking: true,
  bundle: false,
  platform: "node",
  target: "esnext",
  sourcemap: false,
  minify: false,
  tsconfig: "./tsconfig.json",
});

// replace aliases with actual, relative paths
await replaceTscAliasPaths({ outDir });
