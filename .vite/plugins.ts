import nodeExternals from "rollup-plugin-node-externals";
import type { PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export function getPlugins(internalPackages: string[]): PluginOption[] {
  return [
    // externalize node builtins
    nodeExternals({
      exclude: internalPackages,
    }),
    // resolve tsconfig path aliases
    tsconfigPaths(),
  ];
}
