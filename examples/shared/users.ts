import { Database } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import { Injectable, Module } from "xpr/core/mod.ts";
import { DbProvider } from "./providers/db.ts";

@Injectable()
export class UsersService {
  constructor(public readonly database: Database) {
  }
}

@Module({
  providers: [DbProvider, UsersService],
  exports: [DbProvider, UsersService]
})
export class Users {
}
