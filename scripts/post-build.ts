/**
 * This script is run after the build command is run.
 * It is used to add .js extensions to the imports of transpiled files.
 * For some reason, by default, swc doesn't add .js extensions to the imports.
 * All in name of good ESM practices.
 * Hope it doesn't take nestjs too long to act right and forget about commonjs.
 */
import child_process from "node:child_process";
import fs from "node:fs/promises";
import util from "node:util";
import tscAlias from "tsc-alias";

const execAsync = util.promisify(child_process.exec);

// create full temp config because tsc-alias doesn't like extended configs
// https://github.com/justkey007/tsc-alias/issues/230
await execAsync("tsc --showConfig > tsconfig.temp.json");

// replace aliases with actual paths and add .js extensions
await tscAlias.replaceTscAliasPaths({
  resolveFullPaths: true,
  configFile: "tsconfig.temp.json",
});

// clean up temp config
await fs.rm("tsconfig.temp.json");
