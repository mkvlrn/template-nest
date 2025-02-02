import swc from "unplugin-swc";
import { defineConfig } from "vitest/config";

export default defineConfig({
  resolve: {
    conditions: ["default"],
  },

  plugins: [swc.vite({ module: { type: "es6", strict: true } })],

  test: {
    include: ["src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    watch: false,
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      include: ["src"],
      // nestjs main file and modules aren't really testable
      exclude: ["src/**/*.test.{ts,tsx}", "src/main.ts", "src/**/*.module.ts"],
    },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
