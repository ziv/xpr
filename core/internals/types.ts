import type { Target } from "../reflection/mod.ts";
import type Emitter from "../emitter/mod.ts";
import type Modular from "./modular.ts";

// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;
// deno-lint-ignore ban-types
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


export interface CompilerOptions {
  strict: boolean;
  emitter?: Emitter;
}

export type Compiler = (target: Target) => Promise<Modular>;
