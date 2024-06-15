import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, test } from 'vitest';
import { AppService, type IAppService } from '~/app.service.ts';

describe(`AppService`, () => {
  let appService: IAppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [{ provide: `IAppService`, useClass: AppService }],
    }).compile();

    appService = module.get<IAppService>(`IAppService`);
  });

  test(`should return "Hello World!"`, () => {
    const result = appService.getHello();

    expect(result).toBe(`Hello World!`);
  });
});
