import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "#/modules/__shared/shared.module";
import { HelloModule } from "#/modules/hello/hello.module";
import { TaskModule } from "#/modules/task/task.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, HelloModule, TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
