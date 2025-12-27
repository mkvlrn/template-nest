import { type AsyncResult, err, ok } from "@mkvlrn/result";
import { Injectable } from "@nestjs/common";
import { StatusCodes } from "http-status-codes";
import type { JsonPlaceholderResponse } from "#types/responses";
import { AppError } from "#util/app-error";

@Injectable()
export class AppService {
  async getTask(taskId: number): AsyncResult<JsonPlaceholderResponse, AppError> {
    try {
      const url = `https://jsonplaceholder.typicode.com/todos/${taskId}`;
      const response = await fetch(url);
      if (!response.ok) {
        if (response.status === StatusCodes.NOT_FOUND) {
          return err(new AppError("resourceNotFound", `task with id ${taskId} not found`));
        }
        return err(new AppError("externalApiError", `fetch failed with status ${response.status}`));
      }
      const result = await response.json();
      return ok(result as JsonPlaceholderResponse);
    } catch (error) {
      const msg = (error as Error).message;
      return err(new AppError("internalApiError", msg, error));
    }
  }
}
