import { Context } from "packages/core/mod.ts";
import logger from "./app/logger.ts";
import CliModule from "./app/cli-module.ts";
import UsersService from "./app/users-service.ts";

const ctx = await Context.from(CliModule, logger);
const service = await ctx.resolve<UsersService>(UsersService);

console.log(service);
