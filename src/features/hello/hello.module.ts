import { HelloController } from "#features/hello/hello.controller.ts";
import { HelloService } from "#features/hello/services/hello.service.ts";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
