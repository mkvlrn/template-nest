import { Logger } from "@nestjs/common";
import { HttpAdapterHost, NestFactory } from "@nestjs/core";
import { AppModule } from "#/app.module.ts";
import { GlobalFilter } from "#/filters/global.filter.ts";

const port = 4000;
const app = await NestFactory.create(AppModule);
app.useGlobalFilters(new GlobalFilter(app.get(HttpAdapterHost)));

await app.listen(port, () => {
  Logger.log(`Listening on port ${port}`, "DEBUG");
});
