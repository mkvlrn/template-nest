import type { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest, { type Agent } from "supertest";
import { afterEach, assert, beforeEach, describe, it } from "vitest";
import { AppModule } from "#/app.module";

describe("e2e", () => {
  let app: INestApplication;
  let server: Agent;

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
