import { Injectable } from "packages/core/njinn/decorators.ts";
import { Database } from "https://deno.land/x/mongo@v0.29.1/mod.ts";

@Injectable()
export default class UsersService {
  constructor(public readonly db: Database) {
  }

  all() {
    return this.db.collection('users').find({}).toArray();
  }
}
