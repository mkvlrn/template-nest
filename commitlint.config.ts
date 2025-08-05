// biome-ignore lint/correctness/noUndeclaredDependencies: bundled with the cli
import type { UserConfig } from "@commitlint/types";

export default {
  extends: ["@commitlint/config-conventional"],
} satisfies UserConfig;
