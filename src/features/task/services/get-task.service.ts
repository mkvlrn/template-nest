import { Result } from "@mkvlrn/result";
import { Inject, Injectable } from "@nestjs/common";
import { FetchService } from "#/common/http/services/fetch.service.ts";
import type { AppError } from "#/core/error.ts";
import {
  type GetTaskResponse,
  getTaskResponseSchema,
} from "#/features/task/dto/get-task-response.ts";

@Injectable()
export class GetTaskService {
  private readonly fetchService: FetchService;

  constructor(@Inject(FetchService) fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  async getTask(taskId: number): Promise<Result<GetTaskResponse, AppError>> {
    const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
    const result = await this.fetchService.fetch<GetTaskResponse>(url, getTaskResponseSchema);

    if (result.error !== undefined) {
      return Result.error(result.error);
    }

    return Result.ok(result.value);
  }
}
