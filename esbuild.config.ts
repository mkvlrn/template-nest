import { build } from "esbuild";
import { glob } from "glob";
import { replaceTscAliasPaths } from "tsc-alias";
import { compilerOptions } from "./tsconfig.json";

const entryPoints = await glob("src/**/*.ts");
const { outDir } = compilerOptions;

// nothing special
await build({
  entryPoints,
  outdir: outDir,
  bundle: false,
  platform: "node",
  target: "node22",
  sourcemap: false,
  minify: false,
  tsconfig: "./tsconfig.json",
});

// replace aliases with actual, relative paths
await replaceTscAliasPaths({ outDir });
