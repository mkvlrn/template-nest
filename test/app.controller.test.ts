import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import supertest from "supertest";
import { afterEach, beforeEach, describe, expect, test } from "vitest";
import { AppModule } from "~/app.module";
import { AppService } from "~/app.service";
import { MockAppService } from "./_mocks/mock-app-service.js";

describe("AppController", () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(AppService)
      .useClass(MockAppService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test("GET /", async () => {
    const response = await supertest(app.getHttpServer()).get("/");

    expect(response.status).toBe(200);
    expect(response.text).toBe("hello from mock app service");
  });
});
