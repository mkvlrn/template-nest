import { glob } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import pkg from "./package.json" with { type: "json" };

const entryFiles: string[] = [];
for await (const file of glob("src/**/*.ts")) {
  // no need to bundle test files
  if (file.endsWith(".spec.ts") || file.endsWith(".test.ts")) {
    continue;
  }
  entryFiles.push(file);
}

export default defineConfig({
  resolve: {
    alias: {
      "~": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },

  plugins: [],

  build: {
    target: "esnext",
    lib: {
      entry: entryFiles,
      formats: ["es"],
      // biome-ignore lint/nursery/useExplicitType: not sure
      fileName: (_format, entryName) => `${entryName}.js`,
    },
    outDir: "./build",
    emptyOutDir: true,
    rollupOptions: {
      // biome-ignore lint/nursery/useExplicitType: not sure
      external: (id) => {
        // node builtins
        if (id.startsWith("node:")) {
          return false;
        }

        // packages that should be bundled
        const internals = ["@mkvlrn/result"];
        if (internals.includes(id)) {
          return false;
        }

        // external dependencies
        if (Object.keys(pkg.dependencies ?? {}).some((dep) => id.startsWith(dep))) {
          return true;
        }
      },
      output: {
        preserveModules: true,
        preserveModulesRoot: "src",
        // biome-ignore lint/nursery/useExplicitType: not sure
        entryFileNames: ({ name }) => `${name.replace("node_modules/", "_internals/")}.js`,
      },
    },
    minify: false,
  },

  optimizeDeps: {
    esbuildOptions: {
      target: "esnext",
      format: "esm",
    },
  },
});
