import type { BuildEnvironmentOptions } from "vite";

export function getBuild(entryFiles: string[]): BuildEnvironmentOptions {
  return {
    target: "esnext",
    lib: {
      entry: entryFiles,
      formats: ["es"],
      fileName: (_, entryName) => `${entryName}.js`,
    },
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        // this outputs bundled/internal packages to a directory named _internal
        entryFileNames: ({ name }) => `${name.replace("node_modules/", "_internal/")}.js`,
      },
    },
    minify: "terser",
    terserOptions: {
      compress: false,
      format: {
        comments: false,
      },
    },
  };
}
