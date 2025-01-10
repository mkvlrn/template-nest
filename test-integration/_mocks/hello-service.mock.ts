import { vi } from "vitest";
import { HelloService } from "~/features/hello/services/hello.service";

export const mockHelloService: HelloService = {
  sayHello: vi.fn().mockReturnValue("hello from mock hello service"),
};
