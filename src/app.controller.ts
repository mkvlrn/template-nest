import { Controller, Get, Inject, Param } from "@nestjs/common";
import { AppService } from "#/app.service.ts";
import type { JsonPlaceholderResponse } from "#/util/types.ts";

@Controller("tasks")
export class AppController {
  private readonly service: AppService;

  constructor(@Inject(AppService) service: AppService) {
    this.service = service;
  }

  @Get(":id")
  async getTaskById(@Param("id") id: string): Promise<JsonPlaceholderResponse> {
    const result = await this.service.getTask(Number(id));
    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  }
}
