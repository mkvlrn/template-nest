import { Injectable } from "@nestjs/common";

@Injectable()
export class HelloService {
  sayHello(to: string | undefined = "World") {
    if (to.trim() === "" || to === undefined) {
      return "Hello World!";
    }

    return `Hello ${to}!`;
  }
}
