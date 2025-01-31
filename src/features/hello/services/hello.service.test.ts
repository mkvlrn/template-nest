import { HelloService } from "#features/hello/services/hello.service.ts";
import { beforeEach, describe, expect, test } from "vitest";

describe("HelloService", () => {
  let service: HelloService;

  beforeEach(() => {
    service = new HelloService();
  });

  test("should return 'Hello World! when no argument is passed", () => {
    const result = service.sayHello();

    expect(result).toStrictEqual("Hello World!");
  });

  test("should return 'Hello World! when an empty string is passed", () => {
    const result = service.sayHello("");

    expect(result).toStrictEqual("Hello World!");
  });

  test("should return 'Hello John! when 'John' is passed", () => {
    const result = service.sayHello("John");

    expect(result).toStrictEqual("Hello John!");
  });
});
