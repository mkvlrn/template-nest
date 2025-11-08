import assert from "node:assert/strict";
import { afterEach, describe, expect, test, vi } from "vitest";
import { AppService } from "#/app.service";
import { AppError } from "#/util/app-error";
import type { JsonPlaceholderResponse } from "#/util/types";

const service = new AppService();
const url = "https://jsonplaceholder.typicode.com/todos/5";
const fetchSpy = vi.spyOn(global, "fetch");

afterEach(() => {
  vi.resetAllMocks();
});

test("should return a task", async () => {
  const expectedResponse: JsonPlaceholderResponse = {
    userId: 1,
    id: 5,
    title: "Test task",
    completed: true,
  };
  const expectedFetchCalls = [[url]];
  fetchSpy.mockResolvedValue(Response.json(expectedResponse));

  const result = await service.getTask(5);

  assert(result.isOk);
  expect(result.value).toStrictEqual(expectedResponse);
  expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
});

describe("should throw when", () => {
  test("response is 404", async () => {
    const expectedError = new AppError("resourceNotFound", "task with id 5 not found");
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 404, statusText: "NOT FOUND" }));

    const result = await service.getTask(5);

    assert(result.isError);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  test("response is not ok and not 404", async () => {
    const expectedError = new AppError("externalApiError", "fetch failed with status 502");
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("something broke", { status: 502, statusText: "MAYHEM" }));

    const result = await service.getTask(5);

    assert(result.isError);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  test("fetch itself throws", async () => {
    const innerError = new Error("something broke");
    const expectedError = new AppError("internalApiError", "something broke", innerError);
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(innerError);

    const result = await service.getTask(5);

    assert(result.isError);
    expect(result.error).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });
});
