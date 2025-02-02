import { AppController } from "#app.controller.ts";
import { Test } from "@nestjs/testing";
import { beforeEach, describe, expect, test } from "vitest";

describe("redirectToHello", () => {
  let appController: AppController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  test("should redirect to hello", () => {
    const act = () => appController.redirectToHello();

    expect(act).not.toThrow();
  });
});
