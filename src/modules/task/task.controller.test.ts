import { R } from "@mkvlrn/result";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { afterEach, assert, beforeEach, describe, expect, it, vi } from "vitest";
import { TaskController } from "./task.controller.ts";
import type { TaskResponseDto } from "./task.dto.ts";
import { TaskService } from "./task.service.ts";

const MOCK_TASK: TaskResponseDto = { userId: 1, id: 1, title: "task title", completed: false };

let controller: TaskController;
let mockTaskService: TaskService;

beforeEach(async () => {
  mockTaskService = {
    getTask: vi.fn(),
  };

  const module = await Test.createTestingModule({
    controllers: [TaskController],
    providers: [{ provide: TaskService, useValue: mockTaskService }],
  }).compile();

  controller = module.get<TaskController>(TaskController);
});

afterEach(() => {
  vi.clearAllMocks();
});

describe("getTaskById", () => {
  it("should use the service's getTask method", async () => {
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi.spyOn(mockTaskService, "getTask").mockResolvedValue(R.ok(MOCK_TASK));

    const response = await controller.getTaskById({ id: 1 });

    expect(response).toStrictEqual(MOCK_TASK);
    expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
  });

  it("should throw an exception coming from the service", async () => {
    const expectedError = new Error("BadGateway", { cause: HttpStatus.BAD_GATEWAY });
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi
      .spyOn(mockTaskService, "getTask")
      .mockResolvedValue(R.error(expectedError));

    try {
      await controller.getTaskById({ id: 1 });
      assert.fail("Should throw");
    } catch (ex) {
      assert.instanceOf(ex, HttpException);
      expect(getTaskSpy.mock.calls).toStrictEqual(expectedGetTaskCalls);
      expect(ex.message).toStrictEqual(expectedError.message);
      expect(ex.cause).toStrictEqual(expectedError);
    }
  });
});
