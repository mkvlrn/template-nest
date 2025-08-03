import { afterEach, assert, describe, it, vi } from "vitest";
import { AppError } from "#/core/app-error";
import type { TaskResponseDto } from "#/modules/task/task.dto";
import { TaskService } from "#/modules/task/task.service";

const service = new TaskService();
const url = "https://jsonplaceholder.typicode.com/todos/5";

afterEach(() => {
  vi.restoreAllMocks();
});

it("should return a task when fetch is successful", async () => {
  const expectedResponse: TaskResponseDto = {
    userId: 1,
    id: 5,
    title: "Test task",
    completed: true,
  };
  const expectedFetchCalls = [[url]];
  const fetchSpy = vi
    .spyOn(global, "fetch")
    .mockResolvedValue(new Response(JSON.stringify(expectedResponse)));

  const result = await service.getTask(5);

  assert.isUndefined(result.error);
  assert.deepStrictEqual(result.value, expectedResponse);
  assert.deepStrictEqual(fetchSpy.mock.calls, expectedFetchCalls as unknown);
});

describe("should return an error when", () => {
  it("response is not ok", async () => {
    const expectedError = new AppError("BadGateway", "I'm a teapot", 418);
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("I'm a teapot", { status: 418 }));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    assert.deepStrictEqual(result.error, expectedError);
    assert.deepStrictEqual(fetchSpy.mock.calls, expectedFetchCalls as unknown);
  });

  it("task with given id is not found", async () => {
    const expectedError = new AppError("NotFoundError", "Task not found", 404);
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("Task not found", { status: 404 }));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    assert.deepStrictEqual(result.error, expectedError);
    assert.deepStrictEqual(fetchSpy.mock.calls, expectedFetchCalls as unknown);
  });

  it("validation of response object fails", async () => {
    const expectedError = new AppError("BadGateway", "Malformed response", 502);
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(JSON.stringify({ invalid: true }), { status: 200 }));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    assert.deepStrictEqual(result.error, expectedError);
    assert.deepStrictEqual(fetchSpy.mock.calls, expectedFetchCalls as unknown);
  });

  it("any other unexpected error occurs", async () => {
    const expectedError = new AppError("InternalError", "Something broke", 500);
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new Error("Something broke"));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    assert.deepStrictEqual(result.error, expectedError);
    assert.deepStrictEqual(fetchSpy.mock.calls, expectedFetchCalls as unknown);
  });
});
