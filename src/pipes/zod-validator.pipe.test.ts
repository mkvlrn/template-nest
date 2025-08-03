import { HttpException, HttpStatus } from "@nestjs/common";
import { assert, it } from "vitest";
import { z } from "zod";
import { AppError } from "#/core/app-error";
import { ZodValidator } from "#/pipes/zod-validator.pipe";

const schema = z.strictObject({
  age: z.number().min(18),
});

const pipe = new ZodValidator(schema);

it("should validate input", () => {
  const input = { age: 19 };

  const result = pipe.transform(input);

  assert.deepStrictEqual(result, input);
});

it("should throw when input is invalid", () => {
  const expectedError = new AppError(
    "ValidationError",
    "Input validation failed: Too small: expected number to be >=18",
    HttpStatus.UNPROCESSABLE_ENTITY,
  );
  const input = { age: 17 };

  try {
    pipe.transform(input);
    assert.fail("Should throw");
  } catch (ex) {
    assert.instanceOf(ex, HttpException);
    assert.strictEqual(ex.getStatus(), expectedError.statusCode);
    assert.strictEqual(ex.message, expectedError.name);
    assert.instanceOf(ex.cause, AppError);
    assert.deepStrictEqual(ex.cause, expectedError);
  }
});
