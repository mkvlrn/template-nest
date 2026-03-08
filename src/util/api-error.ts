import { defineErrors, type InferAppError } from "@mkvlrn/app-error";

export const apiError = defineErrors({
  resourceNotFound: "NOT_FOUND",
  externalApiError: "BAD_GATEWAY",
  internalApiError: "INTERNAL_SERVER_ERROR",
});

export type ApiError = InferAppError<typeof apiError>;
