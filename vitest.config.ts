import swc from "unplugin-swc";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc.vite({ module: { type: "es6" } }), tsconfigPaths()],
  test: {
    coverage: {
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      all: true,
      include: ["src"],
      exclude: ["**/*.{test,spec}.?(c|m)[jt]s?(x)", "**/*.d.ts", "src/index.ts?(x)"],
    },
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
