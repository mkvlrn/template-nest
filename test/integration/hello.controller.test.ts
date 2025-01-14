import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { HelloController } from "~/features/hello/hello.controller";
import { HelloModule } from "~/features/hello/hello.module";
import { HelloService } from "~/features/hello/services/hello.service";
import { mockHelloService } from "🧪/integration/mock-hello-service";

describe("HelloController", () => {
  let helloController: HelloController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [HelloModule],
    })
      .overrideProvider(HelloService)
      .useValue(mockHelloService)
      .compile();

    helloController = module.get<HelloController>(HelloController);
  });

  describe("getHello", () => {
    test("should use the service's sayHello method", () => {
      const result = helloController.getHello();

      expect(result).toBe("hello from mock hello service");
    });
  });
});
