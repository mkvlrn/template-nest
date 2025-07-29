import { type AsyncResult, R } from "@mkvlrn/result";
import { Injectable } from "@nestjs/common";
import type { ZodType } from "zod";
import { AppError } from "#/core/app-error";

@Injectable()
export class FetchService {
  async fetch<T>(url: string, schema: ZodType<T>): AsyncResult<T, AppError> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        return await this.errorEarly(response);
      }

      return await this.validateResponse(schema, response);
    } catch (error) {
      return R.error(
        new AppError(
          "InternalError",
          `An error occurred while fetching data: ${(error as Error).message}`,
          500,
        ),
      );
    }
  }

  private async errorEarly(response: Response): AsyncResult<never, AppError> {
    const errorText = await response.text();
    switch (response.status) {
      case 404:
        return R.error(new AppError("NotFoundError", `Resource not found: ${errorText}`, 404));
      default:
        return R.error(
          new AppError("InternalError", `An error occurred while fetching data: ${errorText}`, 500),
        );
    }
  }

  private async validateResponse<T>(
    schema: ZodType<T>,
    response: Response,
  ): AsyncResult<T, AppError> {
    const value = await response.json();
    const result = schema.safeParse(value);

    if (!result.success) {
      return R.error(new AppError("BadGateway", "Bad data received from source", 502));
    }

    return R.ok(result.data);
  }
}
