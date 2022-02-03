import type { FactoryProvider, Func, Resolver, Target } from "core/types/mod.ts";
import { getCtrParams, getInjectable, getInjectedParams } from "core/metadata/mod.ts";

export default function provider(target: Target): FactoryProvider {
  const ctrParams = getCtrParams(target);
  const injectedParams = getInjectedParams(target);
  const injectable = getInjectable(target);

  for (const { index, value } of injectedParams) {
    ctrParams[index] = value as Target;
  }

  return {
    token: target,
    scope: injectable.scope,
    factory: async (ctx: Resolver) =>
      Reflect.construct(
        target as Func,
        await Promise.all(ctrParams.map((type) => ctx.get(type))),
      ),
  };
}
