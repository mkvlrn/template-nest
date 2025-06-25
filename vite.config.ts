import { defineConfig } from "vite";
import { getBuild } from "./.vite/build.ts";
import { getOptimize } from "./.vite/optimize.ts";
import { getPlugins } from "./.vite/plugins.ts";
import { getTest } from "./.vite/test.ts";

const entryPoint = "src/main.ts";
// packages to be bundled
const internalPackages: string[] = ["@mkvlrn/result"];

export default defineConfig({
  build: getBuild(entryPoint),
  plugins: getPlugins(internalPackages),
  optimizeDeps: getOptimize(),
  test: getTest(),
});
