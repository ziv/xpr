import { Module } from "xpr/core/mod.ts";
import { UsersModule } from "./users-module.ts";

@Module({
  imports: [UsersModule],
})
export class AppModule {
}
