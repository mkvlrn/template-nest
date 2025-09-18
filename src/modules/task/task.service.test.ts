import { HttpStatus } from "@nestjs/common";
import { afterEach, assert, describe, expect, it, vi } from "vitest";
import type { TaskResponseDto } from "./task.dto.ts";
import { TaskService } from "./task.service.ts";

const service = new TaskService();
const url = "https://jsonplaceholder.typicode.com/todos/5";

afterEach(() => {
  vi.resetAllMocks();
});

it("should return a task when fetch is successful", async () => {
  const expectedResponse: TaskResponseDto = {
    userId: 1,
    id: 5,
    title: "Test task",
    completed: true,
  };
  const expectedFetchCalls = [[url]];
  const fetchSpy = vi.spyOn(global, "fetch").mockResolvedValue(Response.json(expectedResponse));

  const result = await service.getTask(5);

  assert.isUndefined(result.error);
  expect(result.value).toStrictEqual(expectedResponse);
  expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
});

// biome-ignore lint/complexity/noExcessiveLinesPerFunction: huge describe
describe("should return an error when", () => {
  it("response is not ok", async () => {
    const expectedError = new Error("BadGateway", { cause: HttpStatus.I_AM_A_TEAPOT });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("BadGateway", { status: HttpStatus.I_AM_A_TEAPOT }));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  it("task with given id is not found", async () => {
    const expectedError = new Error("Task not found", { cause: HttpStatus.NOT_FOUND });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("Task not found", { status: HttpStatus.NOT_FOUND }));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  it("validation of response object fails", async () => {
    const expectedError = new Error("MalformedResponse", { cause: HttpStatus.BAD_GATEWAY });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(
        new Response(JSON.stringify({ invalid: true }), { status: HttpStatus.OK }),
      );

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  it("any other unexpected error occurs", async () => {
    const expectedError = new Error("Something broke", { cause: HttpStatus.INTERNAL_SERVER_ERROR });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new Error("Something broke"));

    const result = await service.getTask(5);

    assert.isDefined(result.error);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });
});
