import { describe, expect, test, vi } from "vitest";

const REGEX_NEST_MESSAGE = /.*Nest application successfully started.*/;

describe("main", () => {
  test("should start the server'", async () => {
    vi.stubEnv("PORT", "3009");
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => false);
    const match = REGEX_NEST_MESSAGE;

    await import("~/main.js");

    expect(stdoutSpy).toHaveBeenCalledWith(expect.stringMatching(match));
  });
});
