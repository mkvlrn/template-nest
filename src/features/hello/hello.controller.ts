import { HelloService } from "#features/hello/services/hello.service.ts";
import { Controller, Get, Query } from "@nestjs/common";

@Controller("hello")
export class HelloController {
  private readonly helloService: HelloService;

  constructor(helloService: HelloService) {
    this.helloService = helloService;
  }

  @Get()
  getHello(@Query("to") to?: string): string {
    return this.helloService.sayHello(to);
  }
}
