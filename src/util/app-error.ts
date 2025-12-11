import { getReasonPhrase, StatusCodes } from "http-status-codes";

export type AppErrorCode = "resourceNotFound" | "externalApiError" | "internalApiError";

export const ERROR_CODE_TO_STATUS: Record<AppErrorCode, StatusCodes> = {
  resourceNotFound: StatusCodes.NOT_FOUND,
  externalApiError: StatusCodes.BAD_GATEWAY,
  internalApiError: StatusCodes.INTERNAL_SERVER_ERROR,
};

export class AppError extends Error {
  readonly name = "AppError";
  readonly code: AppErrorCode;
  readonly statusCode: StatusCodes;
  readonly status: string;

  constructor(code: AppErrorCode, message: string, cause?: unknown) {
    super(message);
    this.cause = cause;
    this.code = code;
    this.statusCode = ERROR_CODE_TO_STATUS[code];
    this.status = getReasonPhrase(this.statusCode);
  }

  serialize() {
    return {
      code: this.code,
      message: this.message,
      details: this.cause,
    };
  }
}
