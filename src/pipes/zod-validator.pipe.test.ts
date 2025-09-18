/** biome-ignore-all lint/style/noMagicNumbers: fine for tests */
import { HttpException, HttpStatus } from "@nestjs/common";
import { assert, expect, it } from "vitest";
import { z } from "zod";
import { ZodValidator } from "./zod-validator.pipe.ts";

const schema = z.strictObject({
  age: z.number().min(18),
});

const pipe = new ZodValidator(schema);

it("should validate input", () => {
  const input = { age: 19 };

  const result = pipe.transform(input);

  expect(result).toStrictEqual(input);
});

it("should throw when input is invalid", () => {
  const expectedError = new Error("Input validation failed: Too small: expected number to be >=18");
  const input = { age: 17 };

  try {
    pipe.transform(input);
    assert.fail("Should throw");
  } catch (ex) {
    assert.instanceOf(ex, HttpException);
    expect(ex.getStatus()).toBe(HttpStatus.UNPROCESSABLE_ENTITY);
    expect(ex.message).toStrictEqual("ValidationError");
    expect(ex.cause).toStrictEqual(expectedError);
  }
});
