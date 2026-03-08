import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module";
import { env } from "#/env";
import { GlobalFilter } from "#/filters/global.filter";

const app = await NestFactory.create(AppModule);

app.useGlobalFilters(new GlobalFilter(app.get(HttpAdapterHost)));

await app.listen(env.PORT, () => {
  Logger.log(`Listening on port ${env.PORT}`, "DEBUG");
});
