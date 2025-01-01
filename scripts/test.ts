/**
 * This script is used to run tests with vitest.
 * It accepts the following arguments:
 * - --coverage: enables coverage reporting
 * - --watch: enables watch mode
 * - --bail: stops the test suite on the first failure
 */

import swc from "vite-plugin-swc-transform";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";
import { createVitest } from "vitest/node";

const args = process.argv.slice(2);
const availableArgs = ["--coverage", "--watch", "--bail"];

if (args.some((arg) => !availableArgs.includes(arg))) {
  // biome-ignore lint/suspicious/noConsole: this is a cli script
  console.error("This script only accepts the following arguments:");
  // biome-ignore lint/suspicious/noConsole: this is a cli script
  console.error(availableArgs.join(", "));
  process.exit(1);
}

const config = defineConfig({
  plugins: [swc({ swcOptions: { swcrc: true, configFile: true } }), tsconfigPaths()],
  test: {
    watch: args.includes("--watch"),
    bail: args.includes("--bail") ? 1 : 0,
    reporters: ["verbose"],
    coverage: {
      enabled: args.includes("--coverage"),
      all: true,
      clean: true,
      cleanOnRerun: true,
      reportsDirectory: "coverage",
      reporter: ["lcov", "html", "text"],
      include: ["src"],
    },
    // biome-ignore lint/style/useNamingConvention: needed for vitest
    env: { NODE_ENV: "test" },
    environment: "node",
    passWithNoTests: true,
    setupFiles: ["./scripts/test.setup.ts"],
  },
});

const vitest = await createVitest("test", {}, config);
if (!vitest) {
  process.exit(1);
}

await vitest.start();
