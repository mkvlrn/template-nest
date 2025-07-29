import { Controller, Get, Inject, Query } from "@nestjs/common";
import { HelloService } from "#/modules/hello/hello.service";

@Controller("hello")
export class HelloController {
  @Inject(HelloService) private readonly helloService: HelloService;

  constructor(helloService: HelloService) {
    this.helloService = helloService;
  }

  @Get()
  getHello(@Query("to") to?: string): string {
    return this.helloService.sayHello(to);
  }
}
