import type { DepOptimizationOptions } from "vite";

export function getOptimize(): DepOptimizationOptions {
  return {
    esbuildOptions: {
      target: "esnext",
      format: "esm",
    },
  };
}
