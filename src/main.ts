import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { ENV } from "varlock/env";
import { AppModule } from "#/core/app.module";

const app = await NestFactory.create(AppModule);

await app.listen(ENV.PORT, () => {
  Logger.log(`Listening on port ${ENV.PORT}`, "DEBUG");
});
