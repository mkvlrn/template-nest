import type { Configuration } from "lint-staged";

export default {
  "*.{ts,tsx}": ["tsc-files", "biome check --no-errors-on-unmatched", "vitest related"],
  "*.{json,jsonc}": ["biome check --no-errors-on-unmatched"],
} satisfies Configuration;
