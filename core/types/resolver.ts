import type { Token } from "./metadata.ts";

export type ResolverResponse = { resolved: boolean; value?: unknown; error?: Error };
export type ResolverFunction = (token: Token) => Promise<ResolverResponse>;
export type GetFunction = <T>(token: Token) => Promise<T>;
export type Resolver = { resolve: ResolverFunction; get: GetFunction };
