import process from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  const withIntegration = process.env["INTEGRATION"] === "true";
  const testFiles = withIntegration
    ? ["./src/**/*.{test,spec}.{ts,tsx}"]
    : ["./src/**/*.test.{ts,tsx}"];

  return {
    test: {
      include: testFiles,
      reporters: ["verbose"],
      watch: false,
      coverage: {
        all: true,
        clean: true,
        cleanOnRerun: true,
        include: ["src"],
        exclude: ["**/*.{test,spec}.{ts,tsx}", "**/*main.ts"],
      },
      // biome-ignore lint/style/useNamingConvention: needed for vitest
      env: { NODE_ENV: "test" },
      environment: "node",
      passWithNoTests: true,
      setupFiles: [],
    },
  };
});
