import { defineConfig } from "vitest/config";

export default defineConfig(() => {
  return {
    ssr: { resolve: { conditions: ["dev"] } },
    test: {
      include: ["**/**/*.{test,spec}.ts"],
      exclude: ["node_modules"],
      reporters: ["tree"],
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
