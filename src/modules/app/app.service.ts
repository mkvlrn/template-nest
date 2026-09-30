import { httpStatus } from "@mkvlrn/app-error";
import { ResultAsync } from "@mkvlrn/result";
import { Injectable } from "@nestjs/common";
import type { JsonPlaceholderResponse } from "#/types/responses";
import { type ApiError, apiError } from "#/util/api-error";

@Injectable()
export class AppService {
  async getTask(taskId: number): ResultAsync<JsonPlaceholderResponse, ApiError> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === httpStatus.codeFromName("NotFound")) {
          return ResultAsync.err(
            apiError.create("resourceNotFound", `task with id ${taskId} not found`),
          );
        }
        return ResultAsync.err(
          apiError.create("externalApiError", `fetch failed with status ${response.status}`),
        );
      }

      const result = await response.json();

      return ResultAsync.ok(result as JsonPlaceholderResponse);
    } catch (error) {
      const msg = (error as Error).message;

      return ResultAsync.err(apiError.create("internalApiError", msg, error));
    }
  }
}
