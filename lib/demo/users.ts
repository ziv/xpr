import { Database, MongoClient } from "https://deno.land/x/mongo@v0.29.1/mod.ts";
import Module from "core/injection/decorators/module.ts";
import Injectable from "core/injection/decorators/injectable.ts";
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
