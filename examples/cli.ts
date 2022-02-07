import "xpr/core/reflection/reflection.ts";
import { Context } from "xpr/core/mod.ts";
import { blue, green } from "./deps.ts";
import { UsersService } from "./shared/users.ts";
import CliModule from "./shared/cli.module.ts";

function logger(data: any) {
  console.log(blue(data.context), green(data.message));
}

const ctx = await Context.create(CliModule, logger);
const service = await ctx.resolve<UsersService>(UsersService);
console.log(service);
