import { afterEach, describe, expect, test, vi } from "vitest";
import { type ApiResponse, AppService } from "./app.service.ts";

const service = new AppService();
const url = "https://jsonplaceholder.typicode.com/todos/5";
const fetchSpy = vi.spyOn(global, "fetch");

afterEach(() => {
  vi.resetAllMocks();
});

test("should return a task", async () => {
  const expectedResponse: ApiResponse = {
    userId: 1,
    id: 5,
    title: "Test task",
    completed: true,
  };
  const expectedFetchCalls = [[url]];
  fetchSpy.mockResolvedValue(Response.json(expectedResponse));

  const result = await service.getTask(5);

  expect(result).toStrictEqual(expectedResponse);
  expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
});

describe("should throw when", () => {
  test("fetch itself throws", async () => {
    const expectedError = new Error("something broke", { cause: "NETWORK_ERROR" });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi.spyOn(global, "fetch").mockRejectedValue(new TypeError("something broke"));

    const act = () => service.getTask(5);

    await expect(act).rejects.toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });

  test("response is not ok", async () => {
    const expectedError = new Error("fetch failed", { cause: "MAYHEM" });
    const expectedFetchCalls = [[url]];
    const fetchSpy = vi
      .spyOn(global, "fetch")
      .mockResolvedValue(new Response("something broke", { status: 502, statusText: "MAYHEM" }));

    const act = () => service.getTask(5);

    await expect(act).rejects.toStrictEqual(expectedError);
    expect(fetchSpy.mock.calls).toStrictEqual(expectedFetchCalls);
  });
});
