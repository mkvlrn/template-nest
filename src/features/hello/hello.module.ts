import { Module } from "@nestjs/common";
import { HelloController } from "#features/hello/hello.controller";
import { HelloService } from "#features/hello/services/hello.service";

@Module({
  imports: [],
  controllers: [HelloController],
  providers: [HelloService],
})
export class HelloModule {}
