import swc from "vite-plugin-swc-transform";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// biome-ignore lint/style/noDefaultExport: needed for vitest
export default defineConfig({
  plugins: [
    swc({ swcOptions: { swcrc: true, configFile: true } }),
    tsconfigPaths(),
  ],
  test: {
    reporters: ["verbose"],
    coverage: {
      all: true,
      clean: true,
      cleanOnRerun: true,
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      include: ["src"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: ["./vitest.setup.ts"],
  },
});
