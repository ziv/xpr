import type { Token } from "./metadata.ts";

export type ResolverResponse = { resolved: boolean; value?: unknown; error?: Error };
export type ResolverFunction = (token: Token) => Promise<ResolverResponse>;
export type Resolver = { resolve: ResolverFunction };
