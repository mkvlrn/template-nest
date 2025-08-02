import { defineConfig } from "vite";
import baseConfig from "../vite.config.js";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["./e2e/**/*.test.ts"],
  },
});
