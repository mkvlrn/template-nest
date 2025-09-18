/** biome-ignore-all lint/style/noMagicNumbers: fine for tests */
import { type AsyncResult, R } from "@mkvlrn/result";
import { HttpStatus, Injectable } from "@nestjs/common";
import { TaskResponseDto } from "./task.dto.ts";

@Injectable()
export class TaskService {
  async getTask(taskId: number): AsyncResult<TaskResponseDto, Error> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);

      if (!response.ok) {
        const message = await response.text();

        if (response.status === 404) {
          return R.error(new Error(message, { cause: HttpStatus.NOT_FOUND }));
        }

        return R.error(new Error(message, { cause: response.status }));
      }

      const json = await response.json();
      const result = TaskResponseDto.safeParse(json);
      if (result.error) {
        return R.error(new Error("MalformedResponse", { cause: HttpStatus.BAD_GATEWAY }));
      }

      return R.ok(result.data);
    } catch (err) {
      return R.error(
        new Error((err as Error).message, { cause: HttpStatus.INTERNAL_SERVER_ERROR }),
      );
    }
  }
}
