import { Module } from "@nestjs/common";
import { AppController } from "#/modules/app/app.controller";
import { AppService } from "#/modules/app/app.service";

@Module({
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
