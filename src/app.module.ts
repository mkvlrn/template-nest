import { Module } from "@nestjs/common";
import { AppController } from "~/app.controller.ts";
import { AppService } from "~/app.service.ts";

@Module({
  imports: [],
  controllers: [AppController],
  providers: [{ provide: "IAppService", useClass: AppService }],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
