import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { expect, test } from "vitest";
import { AppError } from "#/util/app-error";

test("should create AppError with correct fields", () => {
  const err = new AppError("externalApiError", "external api broke", [{ field: "name" }]);

  expect(err).toBeInstanceOf(Error);
  expect(err.name).toBe("AppError");
  expect(err.code).toBe("externalApiError");
  expect(err.message).toBe("external api broke");
  expect(err.statusCode).toBe(StatusCodes.BAD_GATEWAY);
  expect(err.status).toBe(getReasonPhrase(StatusCodes.BAD_GATEWAY));
  expect(err.cause).toEqual([{ field: "name" }]);
});

test("should serialize correctly", () => {
  const err = new AppError("externalApiError", "external api broke", new Error("error"));

  const serialized = err.serialize();

  expect(serialized).toEqual({
    code: "externalApiError",
    message: "external api broke",
    details: new Error("error"),
  });
});

test("should map all codes to proper status codes", () => {
  const codes = Object.keys(AppError.errorToStatus) as (keyof typeof AppError.errorToStatus)[];
  for (const code of codes) {
    const err = new AppError(code, "msg");
    expect(err.statusCode).toBe(AppError.errorToStatus[code]);
    expect(err.status).toBe(getReasonPhrase(AppError.errorToStatus[code]));
  }
});
