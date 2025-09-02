import { defineConfig } from "vitest/config";
import baseConfig from "../vitest.config.js";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    coverage: {
      enabled: false,
    },
    include: ["./e2e/**/*.test.ts"],
  },
});
