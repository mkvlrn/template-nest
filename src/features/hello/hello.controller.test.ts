import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";
import { mockHelloService } from "~/features/hello/__mocks__/mock-hello-service";
import { HelloController } from "~/features/hello/hello.controller";
import { HelloModule } from "~/features/hello/hello.module";
import { HelloService } from "~/features/hello/services/hello.service";

describe("HelloController", () => {
  let helloController: HelloController;

  describe("getHello", () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({
        imports: [HelloModule],
      })
        .overrideProvider(HelloService)
        .useValue(mockHelloService)
        .compile();

      helloController = module.get<HelloController>(HelloController);
    });

    test("should use the service's sayHello method", () => {
      vi.spyOn(mockHelloService, "sayHello").mockReturnValue("hello from mock hello service");
      const result = helloController.getHello();

      expect(result).toBe("hello from mock hello service");
    });
  });
});
