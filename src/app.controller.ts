import { Controller, Get, Inject } from '@nestjs/common';
import { type IAppService } from '~/app.service.ts';

@Controller()
export class AppController {
  constructor(@Inject('IAppService') private appService: IAppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
