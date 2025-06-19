import { Logger } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "~/app.module.ts";

async function main(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get("PORT") ?? 3000;

  await app.listen(port, () => {
    Logger.log(`Listening on port ${port}`, "DEBUG");
  });
}

await main();
