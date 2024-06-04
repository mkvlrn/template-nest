import { NestFactory } from '@nestjs/core';
import { AppModule } from '#/app.module.ts';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}

await bootstrap();
