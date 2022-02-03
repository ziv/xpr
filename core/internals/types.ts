// import type { Target, Token } from '../reflection/mod.ts';
// import type Emitter from '../emitter/mod.ts';
// import type Modular from './modular.ts';
//
// // deno-lint-ignore ban-types
// export type Func<TFunction = Function> = TFunction;
// // deno-lint-ignore ban-types
// export type Obj<TObject = object> = TObject;
//
// export type { Target, Token };
//
// // resolving types
// export type ResolverResponse = {
//   resolved: boolean;
//   value?: unknown;
//   error?: Error;
// };
//
// export type ResolverFunction = (token: Token) => Promise<ResolverResponse>;
// export type Resolver = { resolve: ResolverFunction };
//
// // providers types
// export type TokenProvider = { token: Token };
// export type FactoryFunction = (ctx: Resolver) => Promise<ResolverResponse>;
// export type FactoryProvider = TokenProvider & { factory: FactoryFunction };
// export type ResolvedProvider = FactoryProvider & { data: unknown };
// export type Provider = Target | FactoryProvider;
//
// // module definition
// export interface ModularDefinition {
//   module: Target;
//   imports: Target[];
//   providers: Provider[];
//   exports: Provider[];
//   resolved?: Modular;
// }
//
// export interface InjectableDefinition {
//   deps: Token[];
//
//   [key: number]: Token;
// }
