import { HttpStatus, type INestApplication } from "@nestjs/common";
import { HttpAdapterHost } from "@nestjs/core";
import { Test } from "@nestjs/testing";
import supertest, { type Agent } from "supertest";
import { afterEach, beforeEach, expect, test, vi } from "vitest";
import { AppModule } from "#/app.module.ts";
import { GlobalFilter } from "#/filters/global.filter.ts";

let app: INestApplication;
let server: Agent;
const fetchSpy = vi.spyOn(global, "fetch");

beforeEach(async () => {
  const module = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = module.createNestApplication();
  app.useGlobalFilters(new GlobalFilter(app.get(HttpAdapterHost)));
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
  fetchSpy.mockResolvedValue(Response.json(expectedResponse));

  const response = await server.get("/tasks/1");

  expect(response.status).toStrictEqual(HttpStatus.OK);
  expect(response.body).toStrictEqual(expectedResponse);
});

test("GET /tasks/-1", async () => {
  const expectedResponse = {
    code: "resourceNotFound",
    message: "task with id -1 not found",
  };
  fetchSpy.mockResolvedValue(
    Response.json(expectedResponse, { status: 404, statusText: "Not Found" }),
  );

  const response = await server.get("/tasks/-1");

  expect(response.status).toStrictEqual(HttpStatus.NOT_FOUND);
  expect(response.body).toStrictEqual(expectedResponse);
});
