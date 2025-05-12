import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "~/app.module.js";

// biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
const app = await NestFactory.create(AppModule);
// biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
const configService = app.get(ConfigService);
// biome-ignore lint/nursery/useExplicitType: https://github.com/biomejs/biome/issues/5932
const port = configService.get("PORT") ?? 3000;

await app.listen(port);
