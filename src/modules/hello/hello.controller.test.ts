import { Test } from "@nestjs/testing";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { HelloController } from "#/modules/hello/hello.controller";
import { HelloService } from "#/modules/hello/hello.service";

describe("HelloController", () => {
  describe("getHello", () => {
    let controller: HelloController;
    let mockHelloService: HelloService;

    beforeEach(async () => {
      mockHelloService = {
        sayHello: vi.fn().mockReturnValue("hello from mock hello service"),
      };

      const module = await Test.createTestingModule({
        controllers: [HelloController],
        providers: [{ provide: HelloService, useValue: mockHelloService }],
      }).compile();

      controller = module.get<HelloController>(HelloController);
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should use the service's sayHello method", () => {
      const result = controller.getHello();

      assert.strictEqual(result, "hello from mock hello service");
    });
  });
});
