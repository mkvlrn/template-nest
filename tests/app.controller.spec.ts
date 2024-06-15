import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import supertest from 'supertest';
import { afterEach, beforeEach, describe, expect, test } from 'vitest';
import { AppModule } from '~/app.module.ts';
import { MockAppService } from '#/mocks/app-service.mock.ts';

describe(`AppController`, () => {
  let app: INestApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(`IAppService`)
      .useClass(MockAppService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  test(`GET /`, async () => {
    const response = await supertest(app.getHttpServer()).get(`/`);

    expect(response.status).toBe(200);
    expect(response.text).toBe(`hello from mock app service`);
  });
});
