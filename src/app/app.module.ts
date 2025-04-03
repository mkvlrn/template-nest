import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "#app/app.controller";
import { HelloModule } from "#features/hello/hello.module";

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HelloModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
