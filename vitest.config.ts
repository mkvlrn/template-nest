import baseConfig from "@mkvlrn/config/vitest";
import { defineConfig, mergeConfig } from "vitest/config";

export default mergeConfig(
  baseConfig,
  defineConfig({
    test: {
      coverage: {
        exclude: ["main.ts"],
      },
    },
  }),
);
