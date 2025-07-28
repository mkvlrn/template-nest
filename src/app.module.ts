import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { SharedModule } from "#/modules/__shared/shared.module.ts";
import { HelloModule } from "#/modules/hello/hello.module.ts";
import { TaskModule } from "#/modules/task/task.module.ts";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), SharedModule, HelloModule, TaskModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}
