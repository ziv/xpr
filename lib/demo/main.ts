import "core/reflection/reflection.ts";
import { Context } from "core/mod.ts";
import { App } from "./app.ts";
import { UsersService } from "./users.ts";
import { Feature } from "./feature.ts";
import { blue, green } from "https://deno.land/std@0.125.0/fmt/colors.ts";

function logger(data: any) {
  console.log(blue(data.context), green(data.message));
}

const ctx = await Context.create(App, logger);
console.log('>>>', await ctx.resolve(UsersService));
console.log('>>>', await ctx.resolve('size'));
console.log('>>>', ctx.select(Feature));
