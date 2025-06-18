import { Module } from "@nestjs/common";
import { HttpModule } from "~/common/http/http.module.ts";
import { GetTaskService } from "~/features/task/services/get-task.service.ts";
import { TaskController } from "~/features/task/task.controller.ts";

@Module({
  imports: [HttpModule],
  controllers: [TaskController],
  providers: [GetTaskService],
  exports: [],
})
export class TaskModule {}
