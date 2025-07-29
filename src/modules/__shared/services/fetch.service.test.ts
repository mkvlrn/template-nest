import { assert, beforeEach, describe, it, vi } from "vitest";
import { AppError } from "#/core/app-error";
import { FetchService } from "#/modules/__shared/services/fetch.service";
import { TaskResponseDto } from "#/modules/task/task.dto";

const MOCK_URL = "https://jsonplaceholder.typicode.com/todos/1";
const MOCK_BODY = { userId: 1, id: 1, title: "delectus aut autem", completed: false };

describe("FetchService", () => {
  let service: FetchService;

  beforeEach(() => {
    service = new FetchService();
  });

  it("should return a successful result when fetch is successful", async () => {
    const mockResponse = new Response(JSON.stringify(MOCK_BODY), { status: 200 });
    vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

    const result = await service.fetch(MOCK_URL, TaskResponseDto);

    assert.isUndefined(result.error);
    assert.deepStrictEqual(result.value, MOCK_BODY);
  });

  describe("when fetch returns a non ok status code", () => {
    it("should return an error when fetch returns a 404", async () => {
      const mockResponse = new Response("not found", { status: 404 });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, TaskResponseDto);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "NotFoundError");
      assert.strictEqual(result.error.message, "Resource not found: not found");
    });

    it("should return an error when fetch returns a 500", async () => {
      const mockResponse = new Response("some error", { status: 500 });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, TaskResponseDto);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(result.error.message, "An error occurred while fetching data: some error");
    });

    it("should return an error when fetch returns 200 but data is malformed", async () => {
      const mockResponse = new Response(JSON.stringify({}), {
        status: 200,
      });
      vi.spyOn(global, "fetch").mockResolvedValue(mockResponse);

      const result = await service.fetch(MOCK_URL, TaskResponseDto);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "BadGateway");
      assert.strictEqual(result.error.message, "Bad data received from source");
    });

    it("should return an error when fetch itself throws an error", async () => {
      vi.spyOn(global, "fetch").mockRejectedValue(new Error("Network error"));

      const result = await service.fetch(MOCK_URL, TaskResponseDto);

      assert.isDefined(result.error);
      assert.instanceOf(result.error, AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(
        result.error.message,
        "An error occurred while fetching data: Network error",
      );
    });
  });
});
