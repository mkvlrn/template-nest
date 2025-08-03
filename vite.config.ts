import { globSync } from "node:fs";
import nodeExternals from "rollup-plugin-node-externals";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// application entry point
const entry = globSync("./src/**/*.ts").filter((f) => !f.endsWith("test.ts"));

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
    },
    sourcemap: true,
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: { output: { preserveModules: true } },
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
      exclude: ["src/**/*.test.{ts,tsx}", "src/main.{ts,tsx}", "src/**/*.module.ts", "**/env.ts"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
