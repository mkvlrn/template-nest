import { AppService } from "~/app.service";

export class MockAppService implements AppService {
  sayHello(): string {
    return "hello from mock app service";
  }
}
