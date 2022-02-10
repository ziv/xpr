// import "xpr/core/reflection/reflection.ts";
// import { Context } from "xpr/core/mod.ts";
// import { AppModule } from "./shared/app.ts";
// import { UsersService } from "./shared/users.ts";
// import { Feature } from "./shared/feature.ts";
// import { blue, green } from "https://deno.land/std@0.125.0/fmt/colors.ts";
//
// function logger(data: any) {
//   console.log(blue(data.context), green(data.message));
// }
//
// const ctx = await Context.from(AppModule, logger);
// console.log('>>>', await ctx.resolve(UsersService));
// console.log('>>>', await ctx.resolve('size'));
// console.log('>>>', ctx.select(Feature));
