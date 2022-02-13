import { Module } from "packages/core/njinn/decorators.ts";
import DbProvider from "./providers/db.ts";
import UsersService from "./users-service.ts";

@Module({
  providers: [DbProvider, UsersService],
  exports: [DbProvider, UsersService],
})
export class UsersModule {
}
