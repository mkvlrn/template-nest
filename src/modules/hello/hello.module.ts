import { Module } from "@nestjs/common";
import { HelloController } from "#/modules/hello/hello.controller.ts";
import { HelloService } from "#/modules/hello/services/hello.service.ts";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
  exports: [],
})
export class HelloModule {}
