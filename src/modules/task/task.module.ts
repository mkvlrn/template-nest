import { Module } from "@nestjs/common";
import { TaskController } from "./task.controller.ts";
import { TaskService } from "./task.service.ts";

@Module({
  imports: [],
  controllers: [TaskController],
  providers: [TaskService],
  exports: [],
})
export class TaskModule {}
