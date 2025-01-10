import { Controller, Get, Redirect } from "@nestjs/common";

@Controller()
export class AppController {
  @Get("/")
  @Redirect("hello", 302)
  redirectToHello(): void {
    // just a dummy method to redirect to the hello endpoint
  }
}
