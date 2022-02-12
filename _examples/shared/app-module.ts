import { Module } from "jinn/core/njinn/mod.ts";
import { UsersModule } from "./users-module.ts";
import { AppController } from "./app-controller.ts";

@Module({
  // imports: [UsersModule],
  // controllers: [AppController]
})
export class AppModule {
}
