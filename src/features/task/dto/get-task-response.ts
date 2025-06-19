import { z } from "zod/v4";

export const getTaskResponseSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type GetTaskResponse = z.infer<typeof getTaskResponseSchema>;
