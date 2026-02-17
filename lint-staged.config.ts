export default {
  "*.{ts,tsx}": ["pnpm typecheck", "pnpm biome-check", "pnpm test-staged"],
  "*.{json,jsonc}": ["pnpm biome-check"],
};
