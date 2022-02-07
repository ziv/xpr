import "lib/corecore/reflection/reflection.ts";
import { blue, green, red } from "https://deno.land/std@0.125.0/fmt/colors.ts";
import { Emitter } from "common/emitter/mod.ts";
import { context } from "common/context/mod.ts";
import { App } from "./app.ts";
import { UsersService } from "./users.ts";

const emitter = new Emitter();
emitter.on(["context", "compiler"], (e: Event) => {
  const type = blue(`${e.type.padEnd(10, ' ')}`);
  const { action, payload } = (e as CustomEvent).detail;
  let module = undefined;
  const event = green(String(action));
  if (payload.module) {
    module = red(payload.module.name)
  }
  console.log(type, event, module);
});

const [ctx] = await context(App, { emitter });
console.log(await ctx.get(UsersService));
