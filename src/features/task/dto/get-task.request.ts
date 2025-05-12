import { z } from "zod";

// biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
export const getTaskRequestSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "'id' must be a numeric string")
    // biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
    .transform((val) => Number.parseInt(val, 10))
    // biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
    .refine((val) => val >= 1, "'id' must be a positive number"),
});

export type GetTaskRequest = z.infer<typeof getTaskRequestSchema>;
