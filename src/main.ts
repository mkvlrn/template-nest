import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "#/core/app.module";
import { env } from "#/core/env";

env();

const app = await NestFactory.create(AppModule);

await app.listen(env("port"), () => {
  Logger.log(`Listening on port ${env("port")}`, "DEBUG");
});
