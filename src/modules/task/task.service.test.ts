import { R } from "@mkvlrn/result";
import { assert, beforeEach, describe, it, vi } from "vitest";
import { AppError } from "#/core/app-error";
import type { FetchService } from "#/modules/__shared/services/fetch.service";
import { TaskService } from "#/modules/task/task.service";

describe("GetTaskService", () => {
  let service: TaskService;
  const mockFetchService: FetchService = {
    fetch: vi.fn(),
  } as unknown as FetchService;

  beforeEach(() => {
    service = new TaskService(mockFetchService);
  });

  it("should return a task when fetch is successful", async () => {
    const mockTask = {
      userId: 1,
      id: 5,
      title: "Test task",
      completed: true,
    };
    const fetchSpy = vi.spyOn(mockFetchService, "fetch").mockResolvedValue(R.ok(mockTask));

    const result = await service.getTask(5);

    assert.isUndefined(result.error);
    assert.deepStrictEqual(result.value, mockTask);
    assert.strictEqual(fetchSpy.mock.calls.length, 1);
    assert.strictEqual(fetchSpy.mock.calls[0]?.[0], "https://jsonplaceholder.typicode.com/todos/5");
  });

  it("should return an error when fetch fails", async () => {
    const fetchSpy = vi
      .spyOn(mockFetchService, "fetch")
      .mockResolvedValue(R.error(new AppError("BadGateway", "Network error", 418)));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    assert.instanceOf(result.error, AppError);
    assert.strictEqual(result.error.message, "Network error");
    assert.strictEqual(result.error.statusCode, 418);
    assert.strictEqual(fetchSpy.mock.calls.length, 1);
    assert.strictEqual(fetchSpy.mock.calls[0]?.[0], "https://jsonplaceholder.typicode.com/todos/5");
  });
});
