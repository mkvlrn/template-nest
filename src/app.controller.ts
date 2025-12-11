import { Controller, Get, Inject, Param } from "@nestjs/common";
import { AppService } from "#/app.service";
import type { JsonPlaceholderResponse } from "#/types/responses";

@Controller("tasks")
export class AppController {
  readonly #service: AppService;

  constructor(@Inject(AppService) service: AppService) {
    this.#service = service;
  }

  @Get(":id")
  async getTaskById(@Param("id") id: string): Promise<JsonPlaceholderResponse> {
    const result = await this.#service.getTask(Number(id));
    if (result.isError) {
      throw result.error;
    }
    return result.value;
  }
}
