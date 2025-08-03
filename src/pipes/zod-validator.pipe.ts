import { HttpException, HttpStatus, Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";
import { AppError } from "#/core/app-error";

@Injectable()
export class ZodValidator implements PipeTransform {
  private readonly schema: ZodType;

  constructor(schema: ZodType) {
    this.schema = schema;
  }

  transform(value: unknown): unknown {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      throw new HttpException("ValidationError", HttpStatus.UNPROCESSABLE_ENTITY, {
        cause: new AppError(
          "ValidationError",
          `Input validation failed: ${errors.join(", ")}`,
          HttpStatus.UNPROCESSABLE_ENTITY,
        ),
      });
    }

    return result.data;
  }
}
