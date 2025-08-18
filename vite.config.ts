import { globSync } from "node:fs";
import nodeExternals from "rollup-plugin-node-externals";
import dts from "vite-plugin-dts";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// application entry point
const excludeFromBuildRegex = /\.(test|spec)\.ts$/;
const entry = globSync("./src/**/*.ts").filter((f) => !excludeFromBuildRegex.test(f));
const entryRoot = "src";

export default defineConfig({
  plugins: [
    // externalize node built-ins
    nodeExternals(),
    // resolve tsconfig path aliases
    tsconfigPaths(),
    // declarations
    dts({ include: entry, logLevel: "error", entryRoot }),
  ],

  build: {
    target: "esnext",
    lib: {
      entry,
      formats: ["es"],
    },
    sourcemap: true,
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: { output: { preserveModules: true, preserveModulesRoot: entryRoot } },
  },

  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    watch: false,
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ["src"],
      exclude: ["**/*.test.{ts,tsx}", "**/*main.ts"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
