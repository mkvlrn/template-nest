import { Module } from '@nestjs/common';
import { AppController } from '#/app.controller.js';
import { AppService } from '#/app.service.js';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class AppModule {}
