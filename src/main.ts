import { AppModule } from "#app.module.ts";
import { NestFactory } from "@nestjs/core";

const { PORT = "3000" } = process.env;
const app = await NestFactory.create(AppModule);

await app.listen(PORT);
