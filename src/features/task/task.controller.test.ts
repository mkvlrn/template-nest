import { Result } from "@mkvlrn/result";
import { Test } from "@nestjs/testing";
import { afterEach, assert, beforeEach, describe, it, vi } from "vitest";
import { GetTaskService } from "#/features/task/services/get-task.service.ts";
import { TaskController } from "#/features/task/task.controller.ts";

const MOCK_TASK = { userId: 1, id: 1, title: "task title", completed: false };

describe("TaskController", () => {
  describe("getTaskById", () => {
    let controller: TaskController;
    let mockGetTaskService: Partial<GetTaskService>;

    beforeEach(async () => {
      mockGetTaskService = {
        getTask: vi.fn().mockReturnValue(Result.ok(MOCK_TASK)),
      };

      const module = await Test.createTestingModule({
        controllers: [TaskController],
        providers: [{ provide: GetTaskService, useValue: mockGetTaskService }],
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
});
