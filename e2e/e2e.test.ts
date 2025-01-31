import { AppModule } from "#app.module.ts";
import { type INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest from "supertest";
import type TestAgent from "supertest/lib/agent.d.ts";
import { afterEach, beforeEach, describe, expect, test } from "vitest";

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

  test("GET / redirects to /hello", async () => {
    const response = await server.get("/");

    expect(response.status).toStrictEqual(302);
    expect(response.headers["location"]).toStrictEqual("hello");
  });

  test("GET /hello", async () => {
    const response = await server.get("/hello");

    expect(response.status).toStrictEqual(200);
    expect(response.text).toStrictEqual("Hello World!");
  });

  test("GET /hello?to=John", async () => {
    const response = await server.get("/hello?to=John");

    expect(response.status).toStrictEqual(200);
    expect(response.text).toStrictEqual("Hello John!");
  });
});
