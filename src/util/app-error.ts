import { getReasonPhrase, StatusCodes } from "http-status-codes";

type ErrorCode = "resourceNotFound" | "externalApiError" | "internalApiError";

export class AppError extends Error {
  static readonly errorToStatus: Record<ErrorCode, StatusCodes> = {
    resourceNotFound: StatusCodes.NOT_FOUND,
    externalApiError: StatusCodes.BAD_GATEWAY,
    internalApiError: StatusCodes.INTERNAL_SERVER_ERROR,
  };
  readonly code: ErrorCode;
  readonly status: string;
  readonly statusCode: StatusCodes;

  constructor(code: ErrorCode, message: string, cause?: unknown) {
    super(message);
    this.name = "AppError";
    this.cause = cause;
    this.code = code;
    const statusCode = AppError.errorToStatus[code];
    this.status = getReasonPhrase(statusCode);
    this.statusCode = statusCode;
  }

  serialize() {
    return {
      code: this.code,
      message: this.message,
      details: this.cause,
    };
  }
}
