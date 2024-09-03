import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    coverage: {
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      all: true,
      include: ["src"],
    },
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
