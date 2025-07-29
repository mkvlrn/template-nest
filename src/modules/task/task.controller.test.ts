import { R } from "@mkvlrn/result";
import { Test } from "@nestjs/testing";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { TaskController } from "#/modules/task/task.controller";
import { TaskService } from "#/modules/task/task.service";

const MOCK_TASK = { userId: 1, id: 1, title: "task title", completed: false };

describe("getTaskById", () => {
  let controller: TaskController;
  let mockTaskService: Partial<TaskService>;

  beforeEach(async () => {
    mockTaskService = {
      getTask: vi.fn().mockReturnValue(R.ok(MOCK_TASK)),
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

  it("should use the service's getTask method", async () => {
    const result = await controller.getTaskById({ id: 1 });

    assert.deepStrictEqual(result, MOCK_TASK);
  });
});
