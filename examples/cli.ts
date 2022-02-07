import "xpr/core/reflection/reflection.ts";
import { Context } from "xpr/core/mod.ts";
import { UsersService } from "./shared/users.ts";
import CliModule from "./shared/cli.module.ts";
import logger from "./shared/logger.ts";

const ctx = await Context.create(CliModule, logger);
const service = await ctx.resolve<UsersService>(UsersService);
console.log(service);
