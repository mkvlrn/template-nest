import swc from "vite-plugin-swc-transform";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc({ swcOptions: { swcrc: true, configFile: true } }), tsConfigPaths()],
  test: {
    include: ["./src/**/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      include: ["src"],
      // nestjs main file and modules aren't really testable
      exclude: ["src/**/*.test.{ts,tsx}", "src/main.ts", "src/**/*.module.ts", "src/**/__mocks__"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
