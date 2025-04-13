import { Result } from "@mkvlrn/result";
import { Inject, Injectable } from "@nestjs/common";
import { FetchService } from "~/common/http/services/fetch.service.js";

export interface Task {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

@Injectable()
export class GetTaskService {
  private readonly fetchService: FetchService;

  constructor(@Inject(FetchService) fetchService: FetchService) {
    this.fetchService = fetchService;
  }

  async getTask(taskId: number): Promise<Result<Task, Error>> {
    const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
    const result = await this.fetchService.fetch<Task>(url);

    return result.ok ? Result.success(result.value as Task) : Result.error(result.error);
  }
}
