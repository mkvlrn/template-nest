import { HttpStatus, type INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest, { type Agent } from "supertest";
import { afterEach, beforeEach, expect, test } from "vitest";
import { AppModule } from "../app.module.ts";

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

test("GET /tasks/1", async () => {
  const expectedResponse = {
    userId: 1,
    id: 1,
    title: "delectus aut autem",
    completed: false,
  };

  const response = await server.get("/tasks/1");

  expect(response.status).toStrictEqual(HttpStatus.OK);
  expect(response.body).toStrictEqual(expectedResponse);
});
