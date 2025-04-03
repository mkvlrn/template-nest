import assert from "node:assert/strict";
import { beforeEach, describe, it } from "node:test";
import { Test } from "@nestjs/testing";
import { AppController } from "#app/app.controller";

describe("redirectToHello", () => {
  let appController: AppController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [AppController],
    }).compile();

    appController = module.get<AppController>(AppController);
  });

  it("should redirect to hello", () => {
    const act = (): void => appController.redirectToHello();

    assert.doesNotThrow(act, "should not throw");
  });
});
