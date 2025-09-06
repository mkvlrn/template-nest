import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";
import { ZodValidator } from "../../pipes/zod-validator.pipe.ts";
import { TaskRequestDto, type TaskResponseDto } from "./task.dto.ts";
import { TaskService } from "./task.service.ts";

@Controller("tasks")
export class TaskController {
  @Inject(TaskService) private readonly getTaskService: TaskService;

  constructor(getTaskService: TaskService) {
    this.getTaskService = getTaskService;
  }

  @Get(":id")
  async getTaskById(
    @Param(new ZodValidator(TaskRequestDto)) params: TaskRequestDto,
  ): Promise<TaskResponseDto> {
    const { id } = params;
    const result = await this.getTaskService.getTask(id);

    if (result.error) {
      throw new HttpException(result.error.name, result.error.statusCode, {
        cause: result.error,
      });
    }

    return result.value;
  }
}
