import nodeExternals from "rollup-plugin-node-externals";
import type { PluginOption } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

export function getPlugins(exclude: string[]): PluginOption[] {
  return [
    // externalize node builtins and configure dependencies to be externalized (or not)
    nodeExternals({
      // externalize dependencies in package.json
      deps: true,
      // devDependencies in package.json
      devDeps: false,
      // dependencies to be bundled
      exclude,
    }),
    // resolve tsconfig path aliases
    tsconfigPaths(),
  ];
}
