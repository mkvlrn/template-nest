import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import { Test } from "@nestjs/testing";
import { HelloController } from "#features/hello/hello.controller";
import { HelloService } from "#features/hello/services/hello.service";

describe("getHello", () => {
  let helloController: HelloController;
  let mockHelloService: HelloService;

  beforeEach(async () => {
    mockHelloService = {
      sayHello: mock.fn(() => "hello from mock hello service"),
    };

    const module = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [{ provide: HelloService, useValue: mockHelloService }],
    }).compile();

    helloController = module.get<HelloController>(HelloController);
  });

  it("should use the service's sayHello method", () => {
    const result = helloController.getHello();

    assert.strictEqual("hello from mock hello service", result);
  });
});
