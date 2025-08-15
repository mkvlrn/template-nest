/** biome-ignore-all lint/style/noMagicNumbers: fine for tests */
import { type AsyncResult, R } from "@mkvlrn/result";
import { HttpStatus, Injectable } from "@nestjs/common";
import { AppError } from "#/core/app-error";
import { TaskResponseDto } from "#/modules/task/task.dto";

@Injectable()
export class TaskService {
  async getTask(taskId: number): AsyncResult<TaskResponseDto, AppError> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);

      if (!response.ok) {
        const message = await response.text();

        if (response.status === 404) {
          return R.error(new AppError("NotFoundError", message, HttpStatus.NOT_FOUND));
        }

        return R.error(new AppError("BadGateway", message, HttpStatus.BAD_GATEWAY));
      }

      const json = await response.json();
      const result = TaskResponseDto.safeParse(json);
      if (result.error) {
        return R.error(new AppError("BadGateway", "Malformed response", HttpStatus.BAD_GATEWAY));
      }

      return R.ok(result.data);
    } catch (err) {
      return R.error(
        new AppError("InternalError", (err as Error).message, HttpStatus.INTERNAL_SERVER_ERROR),
      );
    }
  }
}
