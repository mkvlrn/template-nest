import { AppError } from "@mkvlrn/app-error";

export const apiError = AppError.define({
  resourceNotFound: "NOT_FOUND",
  externalApiError: "BAD_GATEWAY",
  internalApiError: "INTERNAL_SERVER_ERROR",
});

export type ApiError = ReturnType<typeof apiError.create>;
