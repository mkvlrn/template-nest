import { errResult, okResult, type ResultAsync } from "@mkvlrn/result";
import { Injectable } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import type { JsonPlaceholderResponse } from "#/types/responses";
import { type ApiError, apiError } from "#/util/api-error";

@Injectable()
export class AppService {
  async getTask(taskId: number): ResultAsync<JsonPlaceholderResponse, ApiError> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);

      if (!response.ok) {
        if (response.status === StatusCodes.NOT_FOUND) {
          return errResult(apiError.create("resourceNotFound", `task with id ${taskId} not found`));
        }
        return errResult(
          apiError.create("externalApiError", `fetch failed with status ${response.status}`),
        );
      }

      const result = await response.json();

      return okResult(result as JsonPlaceholderResponse);
    } catch (error) {
      const msg = (error as Error).message;

      return errResult(apiError.create("internalApiError", msg, error));
    }
  }
}
