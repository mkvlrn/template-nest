import nodeExternals from "rollup-plugin-node-externals";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// application entry point
const entry = "./src/main.ts";

export default defineConfig({
  plugins: [
    // externalize node built-ins only
    nodeExternals(),
    // resolve tsconfig path aliases
    tsconfigPaths(),
  ],

  build: {
    target: "esnext",
    lib: {
      entry,
      formats: ["es"],
      fileName: "bundle",
    },
    sourcemap: true,
    outDir: "./build",
    emptyOutDir: true,
  },

  test: {
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
  },
});
