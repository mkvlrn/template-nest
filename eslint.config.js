import base from "@mkvlrn/config/eslint-node";

export default [
  ...base,

  {
    ignores: ["node_modules", "dist"],
  },
];
