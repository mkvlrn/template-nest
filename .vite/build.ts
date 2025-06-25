import type { BuildEnvironmentOptions } from "vite";

export function getBuild(entryPoint: string): BuildEnvironmentOptions {
  return {
    target: "esnext",
    lib: {
      entry: entryPoint,
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    sourcemap: true,
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        preserveModules: false,
        preserveModulesRoot: "src",
        // this outputs bundled/internal packages to a directory named _internal
        // only if preserveModules is true
        entryFileNames: ({ name }) => `${name.replace("node_modules/", "_internal/")}.js`,
      },
    },
  };
}
