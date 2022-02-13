import { Controller, Get, Middleware } from "../../gateway/decorators.ts";

@Middleware(Date)
@Controller("app")
export class AppController {
  @Middleware(Date)
  @Get("hello")
  sayHello() {
    return "hello";
  }
}
