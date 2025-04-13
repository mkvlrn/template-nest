import assert from "node:assert/strict";
import { beforeEach, describe, it, mock } from "node:test";
import { FetchService } from "~/common/http/services/fetch.service.js";
import { AppError } from "~/core/error.js";

const MOCK_BODY = { userId: 1, id: 1, title: "delectus aut autem", completed: false };

describe("FetchService", () => {
  let service: FetchService;

  beforeEach(() => {
    service = new FetchService();
  });

  it("should return a successful result when fetch is successful", async () => {
    const mockResponse = new Response(JSON.stringify(MOCK_BODY));
    mock.method(global, "fetch", () => {
      return Promise.resolve(mockResponse);
    });

    const result = await service.fetch("https://jsonplaceholder.typicode.com/todos/1");

    assert.strictEqual(result.ok, true);
    assert.deepStrictEqual(result.value, MOCK_BODY);
  });

  describe("when fetch returns a non ok status code", () => {
    it("should return an error when fetch returns a 404", async () => {
      const mockResponse = new Response(null, { status: 404 });
      mock.method(global, "fetch", () => {
        return Promise.resolve(mockResponse);
      });

      const result = await service.fetch("https://jsonplaceholder.typicode.com/todos/1");

      assert.strictEqual(result.ok, false);
      assert.ok(result.error instanceof AppError);
      assert.strictEqual(result.error.name, "NotFoundError");
      assert.strictEqual(result.error.message, "Resource not found");
    });

    it("should return an error when fetch returns a 500", async () => {
      const mockResponse = new Response(null, { status: 500 });
      mock.method(global, "fetch", () => {
        return Promise.resolve(mockResponse);
      });

      const result = await service.fetch("https://jsonplaceholder.typicode.com/todos/1");

      assert.strictEqual(result.ok, false);
      assert.ok(result.error instanceof AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(result.error.message, "An error occurred while fetching data");
    });

    it("should return an error when fetch itself throws an error", async () => {
      mock.method(global, "fetch", () => {
        throw new Error("Network error");
      });

      const result = await service.fetch("https://jsonplaceholder.typicode.com/todos/1");

      assert.strictEqual(result.ok, false);
      assert.ok(result.error instanceof AppError);
      assert.strictEqual(result.error.name, "InternalError");
      assert.strictEqual(
        result.error.message,
        "An error occurred while fetching data: Network error",
      );
    });
  });
});
