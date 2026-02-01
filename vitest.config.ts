import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  return {
    test: {
      include: ["**/**/*.{test,spec}.ts"],
      exclude: ["node_modules"],
      watch: false,
      coverage: {
        all: true,
        clean: true,
        cleanOnRerun: true,
        include: ["src"],
        exclude: ["**/*.{test,spec}.ts", "src/main.ts"],
      },
      // biome-ignore lint/style/useNamingConvention: needed for vitest
      env: { NODE_ENV: "test" },
      environment: "node",
      passWithNoTests: true,
      setupFiles: [],
    },
  };
});
