import type { Target } from "./reflection.ts";

export type Func<TFunction = Function> = TFunction;
export type Obj<TObject = object> = TObject;

export type { Target };

export type Token = Target | symbol | string;
export type Resolver = {
  resolve: (token: Token, defaultValue?: unknown) => Promise<unknown>;
};
export type FactoryProvider = {
  token: Token;
  factory: (ctx: Resolver) => Promise<unknown>;
};
export type ResolvedProvider = FactoryProvider & { data: unknown };

export type Provider = Target | FactoryProvider;

export interface ModularDefinition {
  imports: Target[];
  providers: Provider[];
  exports: Provider[];
}

export interface InjectableDefinition {
  deps: Token[];

  [key: number]: Token;
}
