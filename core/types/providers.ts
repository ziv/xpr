import type { Target } from "./reflection.ts";
import type { Token } from "./metadata.ts";
import type { Resolver, ResolverResponse } from "./resolver.ts";

export type TokenProvider = { token: Token };
export type FactoryFunction = (ctx: Resolver) => Promise<ResolverResponse>;
export type FactoryProvider = TokenProvider & { factory: FactoryFunction };
export type ResolvedProvider = FactoryProvider & { data: unknown };
export type Provider = Target | FactoryProvider;
