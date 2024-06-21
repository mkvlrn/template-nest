import { Injectable } from '@nestjs/common';

export interface IAppService {
  getHello(): string;
}

@Injectable()
export class AppService implements IAppService {
  getHello(): string {
    return 'Hello World!';
  }
}
