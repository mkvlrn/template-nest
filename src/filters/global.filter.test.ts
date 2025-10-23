import type { ArgumentsHost } from "@nestjs/common";
import type { HttpAdapterHost } from "@nestjs/core";
import { StatusCodes } from "http-status-codes";
import { expect, test, vi } from "vitest";
import { GlobalFilter } from "#/filters/global.filter";
import { AppError } from "#/util/app-error";

const rawResponse = {};
const replySpy = vi.fn();
const adapterHost: HttpAdapterHost = {
  httpAdapter: { reply: replySpy },
} as unknown as HttpAdapterHost;
const host: ArgumentsHost = {
  switchToHttp: () => ({
    getResponse: () => rawResponse,
  }),
} as ArgumentsHost;

const filter = new GlobalFilter(adapterHost);

test("should serialize AppError correctly", () => {
  const err = new AppError("externalApiError", "fail");

  filter.catch(err, host);

  expect(replySpy).toHaveBeenCalledWith(rawResponse, err.serialize(), err.statusCode);
});

test("should handle generic Error", () => {
  const err = new Error("fail");

  filter.catch(err, host);

  expect(replySpy).toHaveBeenCalledWith(
    rawResponse,
    {
      code: "ERR",
      message: "fail",
      details: undefined,
    },
    StatusCodes.INTERNAL_SERVER_ERROR,
  );
});
