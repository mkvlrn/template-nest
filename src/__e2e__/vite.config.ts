import { defineConfig } from "vite";
import baseConfig from "../../vite.config.ts";

export default defineConfig({
  ...baseConfig,
  test: {
    ...baseConfig.test,
    include: ["./src/**/*.spec.ts"],
  },
});
