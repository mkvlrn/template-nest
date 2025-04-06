import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { HelloModule } from "#features/hello/hello.module";
import { TaskModule } from "#features/task/task.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HelloModule, TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
