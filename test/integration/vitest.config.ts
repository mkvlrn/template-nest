import swc from "vite-plugin-swc-transform";
import tsConfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [swc({ swcOptions: { swcrc: true, configFile: true } }), tsConfigPaths()],
  test: {
    include: ["./test/integration/*.test.{ts,tsx}"],
    reporters: ["verbose"],
    coverage: {},
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: [],
  },
});
