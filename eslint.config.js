import { base } from "@mkvlrn/eslint";

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export default [
  ...base,
  {
    ignores: ["dist", "node_modules"],
  },
];
