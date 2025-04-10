import { rm } from "node:fs/promises";
import { replaceTscAliasPaths } from "tsc-alias";
import { build, type Options } from "tsup";

const OUT_DIR = "build";

const tsupOptions: Options = {
  entry: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.spec.ts"],
  outDir: OUT_DIR,
  format: ["esm"],
  target: "esnext",
  platform: "node",
  bundle: false,
  minify: false,
  sourcemap: false,
  splitting: false,
  cjsInterop: false,
  dts: false,
  external: [],
  noExternal: [],
};

await rm(OUT_DIR, { force: true, recursive: true });
await build(tsupOptions);
await replaceTscAliasPaths({ outDir: OUT_DIR });
