import "core/reflection/reflection.ts";
import { Inject, Injectable, Module, context, ModuleScope } from "core/mod.ts";


@Injectable({ scope: ModuleScope })
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
  exports: [CToken0, SizeModule],
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

const AppToken = { token: "size", factory: () => 4 };
@Module({
  imports: [CModule1, CModule0],
  providers: [AppToken],
})
class App {
}

const [ctx, registry] = await context(App);
console.log(ctx);
console.log(await ctx.get(SizeService));
const c0 = registry.get(CModule0)?.host;
const c1 = registry.get(CModule1)?.host;
console.log(await c0?.get(SizeService));
console.log(await c1?.get(SizeService));
