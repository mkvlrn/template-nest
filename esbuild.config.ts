import { build } from "esbuild";
import { glob } from "glob";
import { replaceTscAliasPaths } from "tsc-alias";

const entryPoints = await glob("src/**/*.ts");

// nothing special
await build({
  entryPoints,
  outdir: "dist",
  bundle: false,
  platform: "node",
  target: "node22",
  sourcemap: false,
  minify: false,
  tsconfig: "tsconfig.json",
});

// replace aliases with actual, relative paths
await replaceTscAliasPaths();
