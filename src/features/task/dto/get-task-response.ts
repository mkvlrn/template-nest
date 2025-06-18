import { z } from "zod/v4";

// biome-ignore lint/nursery/useExplicitType: rule is still not great
export const getTaskResponseSchema = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});

export type GetTaskResponse = z.infer<typeof getTaskResponseSchema>;
