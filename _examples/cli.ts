import { Context } from "xpr/core/mod.ts";
import logger from "./shared/logger.ts";
import CliModule from "./shared/cli-module.ts";
import UsersService from "./shared/users-service.ts";

const ctx = await Context.from(CliModule, logger);
const service = await ctx.resolve<UsersService>(UsersService);

console.log(service);
