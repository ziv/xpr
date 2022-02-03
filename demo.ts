import "./core/reflection/reflection.ts";
import { blue, green } from "https://deno.land/std@0.123.0/fmt/colors.ts";
import { Inject, Injectable, Module } from "./core/mod.ts";
import linker from "./core/internals/linker.ts";
import Emitter, { EmitterMessage } from "./core/emitter/mod.ts";
import { compiler, ModularDefinition } from "./core/internals/mod.ts";

@Injectable()
class SizeService {
  constructor(@Inject("size") public i: number) {
  }
}

const SizeToken = { token: "size", factory: () => 10 };

@Module({
  providers: [
    SizeToken,
    SizeService,
  ],
  exports: [SizeToken, SizeService],
})
class SizeModule {
}

const ConfiguredSizeToken = { token: "size", factory: () => 20 };

@Module({
  imports: [SizeModule],
  providers: [ConfiguredSizeToken],
  exports: [SizeModule],
})
class ConfiguredServiceModule {
}

@Module({
  imports: [ConfiguredServiceModule],
})
class App {
}

const link = linker();
const registry = await link(App);
const app = registry.get(App) as ModularDefinition;

const emitter = new Emitter();
const builder = compiler(registry, { strict: true, emitter });
// @ts-ignore the function is not recognise
emitter.subscribe((msg: EmitterMessage) => {
  if (!msg) {
    return;
  }
  const { context, action, payload } = msg;
  const name = (context[0] as any).name;
  console.log(green(action), blue(name));
});

const m = await builder(app);
console.log(await m.resolve(SizeService));
// const emitter = new Emitter();
// const compiler = context({ emitter });
// // @ts-ignore
// emitter.subscribe((msg: { action: string; payload: any; depth: number }) => {
//   if (!msg) {
//     return;
//   }
//   const depth = " ".repeat(msg.depth);
//   console.log(depth, blue(msg.action), msg.payload);
// });
// await compiler(App);
