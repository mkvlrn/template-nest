import nodeExternals from "rollup-plugin-node-externals";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig, type ViteUserConfig } from "vitest/config";

// application entry point
const entry = "./src/main.ts";
// dependencies to be internalized/bundled
const internalPackages: string[] = ["@mkvlrn/result"];

const config: ViteUserConfig = {};

// esm, bundle, build settings
config.build = {
  target: "esnext",
  lib: {
    entry,
    formats: ["es"],
  },
  sourcemap: true,
  outDir: "./build",
  emptyOutDir: true,
};

// plugins
config.plugins = [
  // externalize node builtins
  nodeExternals({
    exclude: internalPackages,
  }),
  // resolve tsconfig path aliases
  tsconfigPaths(),
];

// vitest settings
config.test = {
  include: ["./src/**/*.test.{ts,tsx}"],
  reporters: ["verbose"],
  watch: false,
  coverage: {
    all: true,
    clean: true,
    cleanOnRerun: true,
    include: ["./src"],
    exclude: ["./src/**/*.test.{ts,tsx}", "./src/main.{ts,tsx}"],
  },
  // biome-ignore lint/style/useNamingConvention: needed for vitest
  env: { NODE_ENV: "test" },
  environment: "node",
  passWithNoTests: true,
  setupFiles: [],
};

export default defineConfig(config);
