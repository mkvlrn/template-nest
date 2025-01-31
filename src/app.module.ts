import { AppController } from "#app.controller.ts";
import { HelloModule } from "#features/hello/hello.module.ts";
import { Module } from "@nestjs/common";

@Module({
  imports: [HelloModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
