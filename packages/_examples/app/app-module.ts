import { Module } from "jinn/core/njinn/mod.ts";
import { UsersModule } from "./users-module.ts";

@Module({
  imports: [UsersModule],
})
export class AppModule {
}
