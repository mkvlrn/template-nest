import { getReasonPhrase, StatusCodes } from "http-status-codes";
import { describe, expect, test } from "vitest";
import { AppError, type AppErrorCode, ERROR_CODE_TO_STATUS } from "#util/app-error";

test("should create AppError with correct fields", () => {
  // act
  const err = new AppError("externalApiError", "external api broke", [{ field: "name" }]);
  // assert
  expect(err).toBeInstanceOf(Error);
  expect(err.name).toBe("AppError");
  expect(err.code).toBe("externalApiError");
  expect(err.message).toBe("external api broke");
  expect(err.statusCode).toBe(StatusCodes.BAD_GATEWAY);
  expect(err.status).toBe(getReasonPhrase(StatusCodes.BAD_GATEWAY));
  expect(err.cause).toEqual([{ field: "name" }]);
});

test("should serialize correctly", () => {
  // arrange
  const err = new AppError("externalApiError", "external api broke", new Error("error"));
  // act
  const serialized = err.serialize();
  // assert
  expect(serialized).toEqual({
    code: "externalApiError",
    message: "external api broke",
    details: new Error("error"),
  });
});

describe("should map error codes", () => {
  // arrange
  const codes = Object.keys(ERROR_CODE_TO_STATUS) as AppErrorCode[];
  const testCases: {
    code: AppErrorCode;
    statusCode: StatusCodes;
    status: string;
  }[] = [];
  for (const code of codes) {
    testCases.push({
      code,
      statusCode: ERROR_CODE_TO_STATUS[code],
      status: getReasonPhrase(ERROR_CODE_TO_STATUS[code]),
    });
  }
  // act & assert
  test.each(testCases)("$code: $statusCode -> $status", ({ code, statusCode, status }) => {
    const err = new AppError(code, "msg");
    expect(err.statusCode).toBe(statusCode);
    expect(err.status).toBe(status);
  });
});
