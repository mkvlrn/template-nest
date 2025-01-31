import { HelloController } from "#features/hello/hello.controller.ts";
import { HelloService } from "#features/hello/services/hello.service.ts";
import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test, vi } from "vitest";

describe("getHello", () => {
  let helloController: HelloController;
  let mockHelloService: HelloService;

  beforeEach(async () => {
    mockHelloService = {
      sayHello: vi.fn().mockReturnValue("hello from mock hello service"),
    };

    const module = await Test.createTestingModule({
      controllers: [HelloController],
      providers: [{ provide: HelloService, useValue: mockHelloService }],
    }).compile();

    helloController = module.get<HelloController>(HelloController);
  });

  test("should use the service's sayHello method", () => {
    const result = helloController.getHello();

    expect(result).toBe("hello from mock hello service");
  });
});
