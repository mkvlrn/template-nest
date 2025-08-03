import { R } from "@mkvlrn/result";
import { HttpException, HttpStatus } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { AppError } from "#/core/app-error";
import { TaskController } from "#/modules/task/task.controller";
import type { TaskResponseDto } from "#/modules/task/task.dto";
import { TaskService } from "#/modules/task/task.service";

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

    assert.deepStrictEqual(response, MOCK_TASK);
    assert.deepStrictEqual(getTaskSpy.mock.calls, expectedGetTaskCalls);
  });

  it("should throw an exception coming from the service", async () => {
    const expectedError = new AppError("BadGateway", "Some Error", HttpStatus.BAD_GATEWAY);
    const expectedGetTaskCalls = [[1]];
    const getTaskSpy = vi
      .spyOn(mockTaskService, "getTask")
      .mockResolvedValue(R.error(expectedError));

    try {
      await controller.getTaskById({ id: 1 });
      assert.fail("Should throw");
    } catch (ex) {
      assert.deepStrictEqual(getTaskSpy.mock.calls, expectedGetTaskCalls);
      assert.instanceOf(ex, HttpException);
      assert.strictEqual(ex.getStatus(), expectedError.statusCode);
      assert.strictEqual(ex.message, expectedError.name);
      assert.instanceOf(ex.cause, AppError);
      assert.deepStrictEqual(ex.cause, expectedError);
    }
  });
});
