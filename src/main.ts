import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "#app/app.module";

const app = await NestFactory.create(AppModule);

const configService = app.get(ConfigService);
const port = configService.get("PORT") ?? 3000;

await app.listen(port);
