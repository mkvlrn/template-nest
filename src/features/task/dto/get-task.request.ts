import { z } from "zod";

export const getTaskRequestSchema = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "ID must be a numeric string")
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val >= 1 && val <= 200, "ID must be between 1 and 200"),
});

export type GetTaskRequest = z.infer<typeof getTaskRequestSchema>;
