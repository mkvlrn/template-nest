import { defineConfig } from "vite";
import { getBuild } from "./.vite/build.ts";
import { getEntryFiles } from "./.vite/entries.ts";
import { getOptimize } from "./.vite/optimize.ts";
import { getPlugins } from "./.vite/plugins.ts";

const entryFiles = await getEntryFiles();

export default defineConfig({
  build: getBuild(entryFiles),
  plugins: getPlugins(),
  optimizeDeps: getOptimize(),
});
