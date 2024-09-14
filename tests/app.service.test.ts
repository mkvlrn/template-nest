import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";
import { AppService } from "~/app.service";

describe("AppService", () => {
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  test('should return "Hello World!"', () => {
    const result = appService.sayHello();

    expect(result).toBe("Hello World!");
  });
});
