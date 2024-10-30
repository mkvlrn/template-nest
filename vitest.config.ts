import swcTransform from "vite-plugin-swc-transform";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swcTransform({ swcOptions: { swcrc: true, configFile: true } }), tsconfigPaths()],
  test: {
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      include: ["src"],
    },
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: ["./test/_setup/vitest.setup.ts"],
  },
});
