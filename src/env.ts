// biome-ignore lint/correctness/noNodejsModules: needed
import process from "node:process";
import { cleanEnv, port } from "envalid";

export const env = cleanEnv(process.env, {
  PORT: port({ default: 4000 }),
});
