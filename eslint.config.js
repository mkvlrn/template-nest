import { base } from "@mkvlrn/configurations/eslint";

/** @type {import("typescript-eslint").ConfigWithExtends[]} */
export default [
  ...base,
  {
    ignores: ["dist", "node_modules"],
  },
];
