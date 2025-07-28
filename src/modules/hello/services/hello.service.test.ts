import { assert, beforeEach, describe, it } from "vitest";
import { HelloService } from "#/modules/hello/services/hello.service.ts";

describe("HelloService", () => {
  let service: HelloService;

  beforeEach(() => {
    service = new HelloService();
  });

  it("should return 'Hello World! when no argument is passed", () => {
    const result = service.sayHello();

    assert.strictEqual(result, "Hello World!");
  });

  it("should return 'Hello World! when an empty string is passed", () => {
    const result = service.sayHello("");

    assert.strictEqual(result, "Hello World!");
  });

  it("should return 'Hello John! when 'John' is passed", () => {
    const result = service.sayHello("John");

    assert.strictEqual(result, "Hello John!");
  });
});
