import { z } from "zod";

export const TaskRequestDto = z.object({
  id: z
    .string()
    .regex(/^\d+$/, "'id' must be a numeric string")
    .transform((val) => Number.parseInt(val, 10))
    .refine((val) => val >= 1, "'id' must be a positive number"),
});
export type TaskRequestDto = z.infer<typeof TaskRequestDto>;

export const TaskResponseDto = z.object({
  userId: z.number(),
  id: z.number(),
  title: z.string(),
  completed: z.boolean(),
});
export type TaskResponseDto = z.infer<typeof TaskResponseDto>;
