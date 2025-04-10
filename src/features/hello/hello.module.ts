import { Module } from "@nestjs/common";
import { HelloController } from "~/features/hello/hello.controller.js";
import { HelloService } from "~/features/hello/services/hello.service.js";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
  exports: [],
})
export class HelloModule {}
