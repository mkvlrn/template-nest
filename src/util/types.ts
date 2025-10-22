import type { Result } from "neverthrow";

export type AsyncResult<T, E extends Error> = Promise<Result<T, E>>;

export type JsonPlaceholderResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};
