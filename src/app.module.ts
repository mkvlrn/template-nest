import { Module } from "@nestjs/common";
import { HelloModule } from "~/features/hello/hello.module";

@Module({
  imports: [HelloModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
