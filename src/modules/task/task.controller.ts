import { Controller, Get, HttpException, Inject, Param } from "@nestjs/common";
import { TaskRequestDto, type TaskResponseDto } from "#/modules/task/task.dto";
import { TaskService } from "#/modules/task/task.service";
import { ZodValidationPipe } from "#/pipes/zod-validation-pipe";

@Controller("task")
export class TaskController {
  @Inject(TaskService) private readonly getTaskService: TaskService;

  constructor(getTaskService: TaskService) {
    this.getTaskService = getTaskService;
  }

  @Get(":id")
  async getTaskById(
    @Param(new ZodValidationPipe(TaskRequestDto)) params: TaskRequestDto,
  ): Promise<TaskResponseDto> {
    const { id } = params;
    const result = await this.getTaskService.getTask(id);

    if (result.error !== undefined) {
      throw new HttpException(result.error.message, result.error.statusCode);
    }

    return result.value;
  }
}
