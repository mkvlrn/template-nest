export default {
  "*.{ts,tsx}": ["tsc-files", "pnpm biome-check", "pnpm test-staged"],
  "*.{json,jsonc}": ["pnpm biome-check"],
};
