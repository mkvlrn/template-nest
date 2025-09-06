import { Module } from "@nestjs/common";
import { TaskModule } from "../modules/task/task.module.ts";

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
