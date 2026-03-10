import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { env } from "#/env";
import { GlobalFilter } from "#/filters/global.filter";
import { AppModule } from "#/modules/app/app.module";

const app = await NestFactory.create(AppModule);

app.useGlobalFilters(new GlobalFilter(app.get(HttpAdapterHost)));

await app.listen(env.PORT, () => {
  Logger.log(`Listening on port ${env.PORT}`, "DEBUG");
});
