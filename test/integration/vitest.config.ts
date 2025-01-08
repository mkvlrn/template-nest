import { ViteUserConfig } from "vitest/config";
import base from "../../vitest.config";

// biome-ignore lint/style/noDefaultExport: needed for vitest
export default {
  ...base,
  test: {
    ...base.test,
    include: ["./test/integration/*.test.{ts,tsx}"],
  },
} as ViteUserConfig;
