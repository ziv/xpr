import { Injectable, Module } from "common/decorators/mod.ts";

@Injectable()
export class UsersService {
}

@Module({
  providers: [UsersService],
  exports: [UsersService]
})
export class Users {
}
