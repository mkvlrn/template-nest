import { BadRequestException, Injectable, type PipeTransform } from "@nestjs/common";
import type { ZodType } from "zod";

@Injectable()
export class ZodValidationPipe implements PipeTransform {
  private readonly schema: ZodType;

  constructor(schema: ZodType) {
    this.schema = schema;
  }

  transform(value: unknown): unknown {
    const result = this.schema.safeParse(value);

    if (!result.success) {
      const errors = result.error.issues.map((issue) => issue.message);
      throw new BadRequestException(`Validation failed: ${errors.join(", ")}`);
    }

    return result.data;
  }
}
