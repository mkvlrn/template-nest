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
  };
}
