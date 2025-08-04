import { setupEnv } from "@mkvlrn/env";
import { z } from "zod";

const schema = z.object({
  port: z.coerce.number(),
});

// biome-ignore lint/style/noProcessEnv: gotta
export const env = setupEnv(process.env, schema);
