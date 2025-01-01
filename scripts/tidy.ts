/**
 * This script is used to tidy (lint and format) up project files using biome.
 * It accepts the following arguments:
 * - --verbose: enables verbose output
 */

// biome-ignore lint/correctness/noNodejsModules: cli script
import childProcess from "node:child_process";
// biome-ignore lint/correctness/noNodejsModules: cli script
import fs from "node:fs/promises";
// biome-ignore lint/correctness/noNodejsModules: cli script
import path from "node:path";

// this will add all known files living in the root of the project
const extensions = [".ts", ".js", ".json", ".jsonc"];
let rootFiles = await fs.readdir(process.cwd(), { withFileTypes: true });
rootFiles = rootFiles
  .filter((file) => file.isFile())
  .filter((file) => extensions.includes(path.extname(file.name)));

const tidyArgs = process.argv.slice(2);
if (tidyArgs.length >= 2 || (tidyArgs.length === 1 && tidyArgs[0] !== "--verbose")) {
  // biome-ignore lint/suspicious/noConsole: needs to output error here
  console.error("This script only accepts the following argument:");
  // biome-ignore lint/suspicious/noConsole: needs to output error here
  console.error("--verbose");
  process.exit(1);
}

const command = "npx";
const args = [
  "biome",
  "check",
  "--fix",
  "--no-errors-on-unmatched",
  "./scripts",
  "./src",
  "./test",
];
args.push(...rootFiles.map((file) => `./${file.name}`));
if (tidyArgs[0] === "--verbose") {
  args.push("--verbose");
}

childProcess.spawnSync(command, args, { shell: true, stdio: "inherit", cwd: process.cwd() });
