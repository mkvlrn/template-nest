import { describe, expect, test, vi } from "vitest";

describe("main", () => {
  test("should start the server'", async () => {
    vi.stubEnv("PORT", "3009");
    const stdoutSpy = vi.spyOn(process.stdout, "write").mockImplementation(() => false);
    const match = /.*Nest application successfully started.*/;

    await import("~/main");

    expect(stdoutSpy).toHaveBeenCalledWith(expect.stringMatching(match));
  });
});
