import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "./src/main.ts",
  fixedExtension: false,
  outDir: "./build",
  unbundle: true,
  sourcemap: true,
  minify: true,
});
