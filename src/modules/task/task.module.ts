import { Module } from "@nestjs/common";
import { TaskController } from "#/modules/task/task.controller.ts";
import { TaskService } from "#/modules/task/task.service.ts";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
