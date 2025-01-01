import type { AppService } from "~/app.service.js";

export class MockAppService implements AppService {
  sayHello(): string {
    return "hello from mock app service";
  }
}
