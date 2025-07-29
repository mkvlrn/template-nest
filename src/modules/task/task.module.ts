import { Module } from "@nestjs/common";
import { TaskController } from "#/modules/task/task.controller";
import { TaskService } from "#/modules/task/task.service";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
