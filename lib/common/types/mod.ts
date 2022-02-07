import type { Target } from "core/reflection/reflection.ts";

// internals
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// injection
export type { Target };
export type Token = Target | symbol | string;
export type InjectedParam = { index: number; value: Token };
export type InjectableDescriptor = { scope: symbol };


// providers
export interface Provider {
  token: Token;
  scope?: symbol;
  useValue?: unknown;
  useType?: Token;
  useFactory?: Func;
}


// module
export interface ModuleDescriptor {
  imports: Target[];
  providers: (Target | Provider)[];
  exports: (Target | Provider)[];
}
