import { Module } from "@nestjs/common";
import { HelloController } from "~/features/hello/hello.controller.ts";
import { HelloService } from "~/features/hello/services/hello.service.ts";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
  exports: [],
})
export class HelloModule {}
