import type { FactoryProvider, Func, InjectableDefinition, ModularDefinition, Resolver, Target } from "./types.ts";
import TypesInfo from "./types-info.ts";
import { ResolverError } from "./errors.ts";

const isArray = Array.isArray;

export const resolverFactory = (p: Target) => {
  if (!TypesInfo.has(p)) {
    throw new ResolverError(p);
  }
  return async (ctx: Resolver) => {
    const info = TypesInfo.get<InjectableDefinition>(p);
    const deps = info.deps ?? [];
    console.log(deps);
    const injections = await Promise.all(
      deps.map((type, i) => ctx.resolve(info[i] ?? type)),
    );
    return Reflect.construct(p as Func, injections);
  };
};

export const isFactoryProvider = (p: unknown): boolean =>
  !!((p as FactoryProvider).token) && !!((p as FactoryProvider).factory);

export const isModuleDefinition = (
  { exports, imports, providers }: ModularDefinition,
): boolean =>
  isArray(exports) && isArray(imports) && isArray(providers) &&
  ((exports.length + imports.length + providers.length) > 0);

export const normalizeProvider = (
  p: FactoryProvider | Target,
): FactoryProvider =>
  isFactoryProvider(p as FactoryProvider) ? p as FactoryProvider : { token: p, factory: resolverFactory(p) };
