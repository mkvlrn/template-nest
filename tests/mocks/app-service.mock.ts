import { IAppService } from '~/app.service.ts';

export class MockAppService implements IAppService {
  getHello(): string {
    return `hello from mock app service`;
  }
}
