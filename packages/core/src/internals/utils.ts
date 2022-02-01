import type {
  FactoryProvider,
  Func,
  InjectableDefinition,
  Resolver,
  Target,
  Token,
} from "./types.ts";
import TypesInfo from "./types-info.ts";
import { ResolverError } from "./errors.ts";

export const searchFactory = (imported: Resolver[]) => {
  return async (token: Token) => {
    const df = Symbol("defaultValue");
    for (const im of imported) {
      const data = await im.resolve(token, df);
      if (df !== data) {
        return data;
      }
    }
  };
};

export const resolverFactory = (p: Target) => {
  if (!TypesInfo.has(p)) {
    throw new ResolverError(p);
  }
  return async (ctx: Resolver) => {
    const info = TypesInfo.get<InjectableDefinition>(p);
    const deps = info.deps;
    const injections = await Promise.all(
      deps.map((type, i) => ctx.resolve(info[i] ?? type)),
    );
    return Reflect.construct(p as Func, injections);
  };
};

export const isFactoryProvider = (p: FactoryProvider): boolean =>
  !!(p.token) && !!(p.factory);

export const normalizeProvider = (
  p: FactoryProvider | Target,
): FactoryProvider =>
  isFactoryProvider(p as FactoryProvider)
    ? p as FactoryProvider
    : { token: p, factory: resolverFactory(p) };
