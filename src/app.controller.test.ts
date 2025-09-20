import { Test } from "@nestjs/testing";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { AppController } from "./app.controller.ts";
import { type ApiResponse, AppService } from "./app.service.ts";

const MOCK_TASK: ApiResponse = { userId: 1, id: 1, title: "task title", completed: false };

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
  vi.clearAllMocks();
});

describe("getTaskById", () => {
  it("should use the service's getTask method", async () => {
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi.spyOn(service, "getTask").mockResolvedValue(MOCK_TASK);

    const response = await controller.getTaskById("1");

    expect(response).toStrictEqual(MOCK_TASK);
    expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
  });

  it("should throw an exception coming from the service", async () => {
    const expectedError = new TypeError("something broke", { cause: "NETWORK_ERROR" });
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi.spyOn(service, "getTask").mockRejectedValue(expectedError);

    const act = () => controller.getTaskById("1");

    await expect(act).rejects.toThrow(expectedError);
    expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
  });
});
