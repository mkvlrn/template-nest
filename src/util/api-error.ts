import { AppError } from "@mkvlrn/app-error";

export const apiError = AppError.define({
  resourceNotFound: "NotFound",
  externalApiError: "BadGateway",
  internalApiError: "InternalServerError",
});

export type ApiError = ReturnType<typeof apiError.create>;
