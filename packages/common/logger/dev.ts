import type { LogRecord } from "jinn/common/deps/log.ts";
import { handlers, Logger } from "jinn/common/deps/log.ts";
import { blue, brightRed, brightGreen, brightMagenta, green, red, brightYellow, cyan, gray, reset } from "jinn/common/deps/colors.ts";
import { format } from "jinn/common/deps/datetime.ts";
import { sprintf } from "jinn/common/deps/fmt.ts";

const LEVELS: Record<string, string> = {
  "DEBUG": blue("DBG"),
  "INFO": brightGreen("INF"),
  "WARNING": brightYellow("WRN"),
  "ERROR": red("ERR"),
  "CRITICAL": brightRed("CRT")
};

export function devLogger() {
  return new Logger("DEV", "DEBUG", {
    handlers: [
      new handlers.ConsoleHandler("DEBUG", {
        formatter: ({ levelName, msg, datetime, args, loggerName }: LogRecord) => {
          return [
            green(format(datetime, "HH:mm:ss.SSS")),
            reset(LEVELS[levelName]),
            brightMagenta(`[${loggerName}]`),
            cyan(sprintf(msg, ...args))
          ].join(" ");
        }
      })
    ]
  });
}
