import { glob } from "node:fs/promises";

export async function getEntryFiles(): Promise<string[]> {
  const entryFiles: string[] = [];
  for await (const file of glob("src/**/*.ts")) {
    if (!(file.endsWith(".test.ts") || file.endsWith(".spec.ts"))) {
      entryFiles.push(file);
    }
  }

  return entryFiles;
}
