import { rm } from "node:fs/promises";
import { build } from "esbuild";
import { esbuildPluginFilePathExtensions } from "esbuild-plugin-file-path-extensions";
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
  bundle: true, // only to make the extension plugin work
  external: ["*"],
  platform: "node",
  target: "ESNext",
  sourcemap: false,
  format: "esm",
  minify: false,
  tsconfig: "./tsconfig.json",
  plugins: [esbuildPluginFilePathExtensions({ esm: true, esmExtension: "js" })],
});

// replace aliases with actual, relative paths
await replaceTscAliasPaths({ outDir });
