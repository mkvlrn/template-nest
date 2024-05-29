import { Test } from '@nestjs/testing';
import { beforeEach, describe, expect, test } from 'vitest';
import { AppService } from '#/app.service.js';

describe('AppService', () => {
  let appService: AppService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    appService = module.get<AppService>(AppService);
  });

  test('should return "Hello World!"', async () => {
    const result = await appService.getHello();

    expect(result).toBe('Hello World!');
  });
});
