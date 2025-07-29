import { type AsyncResult, R } from "@mkvlrn/result";
import { Inject, Injectable } from "@nestjs/common";
import type { AppError } from "#/core/app-error";
import { FetchService } from "#/modules/__shared/services/fetch.service";
import { TaskResponseDto } from "#/modules/task/task.dto";

@Injectable()
export class TaskService {
  @Inject(FetchService) private readonly fetchService: FetchService;

  constructor(fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  async getTask(taskId: number): AsyncResult<TaskResponseDto, AppError> {
    const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
    const result = await this.fetchService.fetch<TaskResponseDto>(url, TaskResponseDto);

    if (result.error !== undefined) {
      return R.error(result.error);
    }

    return R.ok(result.value);
  }
}
