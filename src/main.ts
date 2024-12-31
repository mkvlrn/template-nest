import { NestFactory } from "@nestjs/core";
import { AppModule } from "~/app.module.js";

const { PORT = "3000" } = process.env;
const app = await NestFactory.create(AppModule);

await app.listen(PORT);
