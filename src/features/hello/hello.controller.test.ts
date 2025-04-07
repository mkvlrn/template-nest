import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it, mock } from "node:test";
import { Test } from "@nestjs/testing";
import { HelloController } from "#features/hello/hello.controller";
import { HelloService } from "#features/hello/services/hello.service";

describe("HelloController", () => {
  describe("getHello", () => {
    let controller: HelloController;
    let mockHelloService: HelloService;

    beforeEach(async () => {
      mockHelloService = {
        sayHello: mock.fn(() => "hello from mock hello service"),
      };

      const module = await Test.createTestingModule({
        controllers: [HelloController],
        providers: [{ provide: HelloService, useValue: mockHelloService }],
      }).compile();

      controller = module.get<HelloController>(HelloController);
    });

    afterEach(() => {
      mock.reset();
    });

    it("should use the service's sayHello method", () => {
      const result = controller.getHello();

      assert.strictEqual(result, "hello from mock hello service");
    });
  });
});
