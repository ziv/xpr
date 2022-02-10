import type { Target } from "xpr/core/reflection/reflection.ts";
import type Registry from "./registry.ts";

// internals
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// injection
export type { Target };
export type Token = Target | symbol | string;
export type InjectedParam = { index: number; value: Token };
export type InjectableDescriptor = { scope: string };

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
  [key: string]: unknown;
}

export interface ModuleRef {
  get id(): string;
  get exports(): Registry;
  get provides(): Registry;
  resolve<T = unknown>(target: Token): Promise<T>;
}
