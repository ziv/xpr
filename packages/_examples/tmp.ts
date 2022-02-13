import "jinn/reflect";
import linker from "jinn/core/njinn/linker.ts";
import { devLogger } from "jinn/common/logger/dev.ts";
import { AppModule } from "./app/app-module.ts";
import UsersService from "./app/users-service.ts";

const logger = devLogger();
const link = linker({ logger });
const host = link(AppModule);
const users = await host.resolve<UsersService>(UsersService);

logger.info("Users found %j", users);
// logger.warning("Users found %j", users);
// logger.error("Users found %j", users);
// logger.critical("Users found %j", users);
