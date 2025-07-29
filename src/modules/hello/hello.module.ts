import { Module } from "@nestjs/common";
import { HelloController } from "#/modules/hello/hello.controller";
import { HelloService } from "#/modules/hello/hello.service";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
  exports: [],
})
export class HelloModule {}
