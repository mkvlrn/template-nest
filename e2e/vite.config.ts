import { defineConfig } from "vite";
import baseConfig from "../vite.config.js";

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
