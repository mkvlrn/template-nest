import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { AppModule } from "~/app.module";
import { HelloController } from "~/features/hello/hello.controller";
import { HelloService } from "~/features/hello/services/hello.service";
import { mockHelloService } from "🧪/integration/mocks/hello-service.mock";

describe("HelloController", () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(HelloService)
      .useValue(mockHelloService)
      .compile();

    const app = module.createNestApplication();

    helloController = app.get<HelloController>(HelloController);
  });

  describe("getHello", () => {
    test("should use the service's sayHello method", () => {
      const result = helloController.getHello();

      expect(result).toBe("hello from mock app service");
    });
  });
});
