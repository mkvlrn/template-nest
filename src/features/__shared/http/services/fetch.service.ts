import { Result } from "@mkvlrn/result";
import { Injectable } from "@nestjs/common";
import { AppError } from "~/core/error.js";

@Injectable()
export class FetchService {
  async fetch<T>(url: string): Promise<Result<T, Error>> {
    try {
      const response = await fetch(url);

      if (!response.ok) {
        switch (response.status) {
          case 404:
            return Result.error(new AppError("NotFoundError", "Resource not found", 404));
          default:
            return Result.error(
              new AppError("InternalError", "An error occurred while fetching data", 500),
            );
        }
      }

      const data = await response.json();

      return Result.success(data as T);
    } catch (error) {
      return Result.error(
        new AppError(
          "InternalError",
          `An error occurred while fetching data: ${(error as Error).message}`,
          500,
        ),
      );
    }
  }
}
