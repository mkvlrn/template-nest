import { Module } from "@nestjs/common";
import { HttpModule } from "#features/__shared/http/http.module";
import { GetTaskService } from "#features/task/services/get-task.service";
import { TaskController } from "#features/task/task.controller";

@Module({
  imports: [HttpModule],
  controllers: [TaskController],
  providers: [GetTaskService],
  exports: [],
})
export class TaskModule {}
