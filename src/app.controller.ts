import { Controller, Get, Inject, Param } from "@nestjs/common";
import { type ApiResponse, AppService } from "./app.service.ts";

@Controller("tasks")
export class AppController {
  @Inject(AppService) private readonly service: AppService;

  constructor(service: AppService) {
    this.service = service;
  }

  @Get(":id")
  async getTaskById(@Param("id") id: string): Promise<ApiResponse> {
    return await this.service.getTask(Number(id));
  }
}
