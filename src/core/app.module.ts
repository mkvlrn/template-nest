import { Module } from "@nestjs/common";

import { TaskModule } from "#/modules/task/task.module";

@Module({
  imports: [TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
