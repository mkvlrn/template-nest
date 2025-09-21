import process from "node:process";
import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  const testFiles = ["./src/**/*.{test,spec}.{ts,tsx}"];
  if (process.env["E2E"] === "true") {
    testFiles.push("./e2e/**/*.{test,spec}.{ts,tsx}");
  }

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
        exclude: ["**/*.{test,spec}.{ts,tsx}"],
      },
      // biome-ignore lint/style/useNamingConvention: needed for vitest
      env: { NODE_ENV: "test" },
      environment: "node",
      passWithNoTests: true,
      setupFiles: [],
    },
  };
});
