import { assert, beforeEach, describe, it, vi } from "vitest";
import { FetchService } from "#/common/http/services/fetch.service.ts";
import { AppError } from "#/core/error.ts";
import { getTaskResponseSchema } from "#/features/task/dto/get-task-response.ts";

const MOCK_URL = "https://jsonplaceholder.typicode.com/todos/1";
const MOCK_BODY = { userId: 1, id: 1, title: "delectus aut autem", completed: false };

// biome-ignore lint/nursery/noExcessiveLinesPerFunction: it's a test suite, calm down biome
describe("FetchService", () => {
  let service: FetchService;

  beforeEach(() => {
    service = new FetchService();
  });

  it("should return a successful result when fetch is successful", async () => {
    const mockResponse = new Response(JSON.stringify(MOCK_BODY), { status: 200 });
    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await service.fetch(MOCK_URL, getTaskResponseSchema);

    assert.isTrue(result.ok);
    assert.deepStrictEqual(result.value, MOCK_BODY);
  });

  describe("when fetch returns a non ok status code", () => {
    it("should return an error when fetch returns a 404", async () => {
      const mockResponse = new Response("not found", { status: 404 });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, getTaskResponseSchema);

      assert.isFalse(result.ok);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "NotFoundError");
      assert.strictEqual(result.error.message, "Resource not found: not found");
    });

    it("should return an error when fetch returns a 500", async () => {
      const mockResponse = new Response("some error", { status: 500 });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, getTaskResponseSchema);

      assert.isFalse(result.ok);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(result.error.message, "An error occurred while fetching data: some error");
    });

    it("should return an error when fetch returns 200 but data is malformed", async () => {
      const mockResponse = new Response(JSON.stringify({}), {
        status: 200,
      });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, getTaskResponseSchema);

      assert.isFalse(result.ok);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "BadGateway");
      assert.strictEqual(result.error.message, "Bad data received from source");
    });

    it("should return an error when fetch itself throws an error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

      const result = await service.fetch(MOCK_URL, getTaskResponseSchema);

      assert.isFalse(result.ok);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(
        result.error.message,
        "An error occurred while fetching data: Network error",
      );
    });
  });
});
