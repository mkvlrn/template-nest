import { err, ok } from "@mkvlrn/result";
import { afterEach, describe, expect, test, vi } from "vitest";
import { AppService } from "#/modules/app/app.service";
import type { JsonPlaceholderResponse } from "#/types/responses";
import { apiError } from "#/util/api-error";

const service = new AppService();
const url = "https://jsonplaceholder.typicode.com/todos/5";
const fetchSpy = vi.spyOn(global, "fetch");

afterEach(() => {
  vi.resetAllMocks();
});

test("should return a task", async () => {
  // arrange
  const expectedResponse: JsonPlaceholderResponse = {
    userId: 1,
    id: 5,
    title: "Test task",
    completed: true,
  };
  const expectedFetchCalls = [[url]];
  fetchSpy.mockResolvedValue(Response.json(expectedResponse));
  // act
  const result = await service.getTask(5);
  // assert
  expect(result).toStrictEqual(ok(expectedResponse));
  expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
});

describe("should return error when", () => {
  test("response is 404", async () => {
    // arrange
    const expectedError = err(apiError.create("resourceNotFound", "task with id 5 not found"));
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response(null, { status: 404, statusText: "NOT FOUND" }));
    // act
    const result = await service.getTask(5);
    // assert
    expect(result).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  test("response is not ok and not 404", async () => {
    // arrange
    const expectedError = err(apiError.create("externalApiError", "fetch failed with status 502"));
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("something broke", { status: 502, statusText: "MAYHEM" }));
    // act
    const result = await service.getTask(5);
    // assert
    expect(result).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  test("fetch itself throws", async () => {
    // arrange
    const innerError = new Error("something broke");
    const expectedError = err(apiError.create("internalApiError", "something broke", innerError));
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(innerError);
    // act
    const result = await service.getTask(5);
    // assert
    expect(result).toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });
});
