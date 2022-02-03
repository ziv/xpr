import "core/reflection/reflection.ts";
import { context, Inject, Injectable, Module, ModuleScope } from "core/mod.ts";


@Injectable({scope: ModuleScope})
class SizeService {
  constructor(@Inject("size") public i: number) {
  }
}

const SizeToken = { token: "size", factory: () => 1 };

@Module({
  providers: [
    SizeToken,
    SizeService,
  ],
  exports: [SizeToken, SizeService],
})
class SizeModule {
}

const CToken0 = { token: "size", factory: () => 2 };

@Module({
  imports: [SizeModule],
  providers: [CToken0],
  exports: [SizeModule, CToken0],
})
class CModule0 {
}

const CToken1 = { token: "size", factory: () => 3 };

@Module({
  imports: [SizeModule],
  providers: [CToken1],
  exports: [CToken1, SizeModule],
})
class CModule1 {
}

@Module({
  imports: [CModule0, CModule1],
})
class App {
}

const [ctx, registry] = await context(App);
// console.log(ctx);
console.log(await ctx.get<SizeService>(SizeService));
const c0 = registry.get(CModule0)?.host;
const c1 = registry.get(CModule1)?.host;
console.log(await c0?.get(SizeService));
console.log(await c1?.get(SizeService));
