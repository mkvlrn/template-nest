import { rm } from "node:fs/promises";
import { build, type Options } from "tsup";

const options: Options = {
  entry: ["src/**/*.ts", "!src/**/*.test.ts", "!src/**/*.spec.ts"],
  outDir: "build",
  format: ["esm"],
  target: "esnext",
  platform: "node",
  bundle: false,
  minify: false,
  sourcemap: false,
  splitting: false,
  cjsInterop: false,
  dts: false,
  esbuildOptions: (options) => {
    options.conditions = ["dev"];
  },
  external: [],
  noExternal: [],
};

await rm("build", { force: true, recursive: true });
await build(options);
