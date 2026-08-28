import "varlock/auto-load";
import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { ENV } from "varlock/env";
import { GlobalFilter } from "#/filters/global.filter";
import { AppModule } from "#/modules/app/app.module";

const app = await NestFactory.create(AppModule);

app.useGlobalFilters(new GlobalFilter(app.get(HttpAdapterHost)));

await app.listen(ENV.port, "0.0.0.0", () => {
  Logger.log(`Listening on port ${ENV.port}`, "DEBUG");
});
