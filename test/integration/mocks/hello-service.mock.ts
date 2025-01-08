import type { HelloService } from "~/features/hello/services/hello.service";

export const mockHelloService: HelloService = {
  sayHello: () => "hello from mock app service",
};
