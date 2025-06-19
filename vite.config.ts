import { glob } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { nodeExternals } from "rollup-plugin-node-externals";
import { defineConfig } from "vite";

const entryFiles: string[] = [];
for await (const file of glob("src/**/*.ts")) {
  // no need to bundle test files
  if (!(file.endsWith(".test.ts") || file.endsWith(".spec.ts"))) {
    entryFiles.push(file);
  }
}

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [
    nodeExternals({
      // packages to be set as internal
      exclude: ["@mkvlrn/result"],
    }),
  ],

  build: {
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
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      format: "esm",
    },
  },
});
