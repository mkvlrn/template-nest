import assert from "node:assert/strict";
import { afterEach, beforeEach, describe, it } from "node:test";
import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest from "supertest";
import type TestAgent from "supertest/lib/agent.d.ts";
import { AppModule } from "#app/app.module";

describe("e2e", () => {
  let app: INestApplication;
  let server: TestAgent;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = module.createNestApplication();
    await app.init();
    server = supertest(app.getHttpServer());
  });

  afterEach(async () => {
    await app.close();
  });

  it("GET / redirects to /hello", async () => {
    const response = await server.get("/");

    assert.strictEqual(response.status, 302);
    assert.strictEqual(response.headers.location, "hello");
  });

  it("GET /hello", async () => {
    const response = await server.get("/hello");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, "Hello World!");
  });

  it("GET /hello?to=John", async () => {
    const response = await server.get("/hello?to=John");

    assert.strictEqual(response.status, 200);
    assert.strictEqual(response.text, "Hello John!");
  });
});
