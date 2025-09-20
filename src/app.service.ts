import { Injectable } from "@nestjs/common";

export type ApiResponse = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
};

@Injectable()
export class AppService {
  async getTask(taskId: number): Promise<ApiResponse> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("fetch failed", { cause: response.statusText });
      }

      return (await response.json()) as ApiResponse;
    } catch (err) {
      if (err instanceof TypeError) {
        throw new Error(err.message, { cause: "NETWORK_ERROR" });
      }

      throw err;
    }
  }
}
