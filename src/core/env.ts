// biome-ignore lint/correctness/noNodejsModules: backend
import process from "node:process";
import { setupEnv } from "@mkvlrn/env";
import { z } from "zod";

const schema = z.object({
  port: z.coerce.number(),
});

export const env = setupEnv(process.env, schema);
