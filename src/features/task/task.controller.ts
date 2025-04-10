import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";
import type { AppError } from "~/core/error.js";
import { type GetTaskRequest, getTaskRequestSchema } from "~/features/task/dto/get-task.request.js";
import { GetTaskService, type Task } from "~/features/task/services/get-task.service.js";
import { Validate } from "~/validation/zod.js";

@Controller("task")
export class TaskController {
  private readonly getTaskService: GetTaskService;

  constructor(@Inject(GetTaskService) getTaskService: GetTaskService) {
    this.getTaskService = getTaskService;
  }

  @Get(":id")
  @Validate(getTaskRequestSchema)
  async getTaskById(@Param() params: GetTaskRequest): Promise<Task> {
    const { id } = params;
    const result = await this.getTaskService.getTask(id);

    if (!result.ok) {
      const appError = result.error as AppError;
      throw new HttpException(appError.message, appError.statusCode);
    }

    return result.value;
  }
}
