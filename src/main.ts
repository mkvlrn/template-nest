import { Logger } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module.ts";

const port = 4000;
const app = await NestFactory.create(AppModule);

await app.listen(port, () => {
  Logger.log(`Listening on port ${port}`, "DEBUG");
});
