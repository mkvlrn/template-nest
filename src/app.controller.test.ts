import { err, ok } from "@mkvlrn/result";
import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { AppController } from "#/app.controller";
import { AppService } from "#/app.service";
import { AppError } from "#/util/app-error";
import type { JsonPlaceholderResponse } from "#/util/types";

const MOCK_TASK: JsonPlaceholderResponse = {
  userId: 1,
  id: 1,
  title: "task title",
  completed: false,
};

let controller: AppController;
let service: AppService;

beforeEach(async () => {
  service = {
    getTask: vi.fn(),
  };

  const module = await Test.createTestingModule({
    controllers: [AppController],
    providers: [{ provide: AppService, useValue: service }],
  }).compile();

  controller = module.get<AppController>(AppController);
});

afterEach(() => {
  vi.resetAllMocks();
});

describe("getTaskById", () => {
  test("should use the service's getTask method", async () => {
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi.spyOn(service, "getTask").mockResolvedValue(ok(MOCK_TASK));

    const response = await controller.getTaskById("1");

    expect(response).toStrictEqual(MOCK_TASK);
    expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
  });

  test("should throw an exception coming from the service", async () => {
    const expectedError = new AppError("externalApiError", "something broke");
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi.spyOn(service, "getTask").mockResolvedValue(err(expectedError));

    const act = () => controller.getTaskById("1");

    await expect(act).rejects.toThrow(expectedError);
    expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
  });
});
