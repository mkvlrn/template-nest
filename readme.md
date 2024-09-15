# template-nest

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=mkvlrn_template-nest&metric=alert_status)](https://sonarcloud.io/summary/new_code?id=mkvlrn_template-nest)

A sane, opinionated template for esm nestjs projects written in typescript.

Uses eslint, prettier, commitlint, vitest, lint-staged, husky, esbuild.

## Notes

Constructor injection **needs** to use the `Inject` decorator because of tsx and esbuild support - decorators are still experimental on those tools. This is a small price to pay for such convenience. Example below:

```ts
import { Controller, Get, Inject } from "@nestjs/common";
import { AppService } from "~/app.service.js";

@Controller()
export class AppController {
  constructor(@Inject(AppService) private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.sayHello();
  }
}
```
