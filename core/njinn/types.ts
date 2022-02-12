import type { Target } from "../reflection/reflection.ts";
import type Registry from "./registry.ts";

// internals
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// injection
export type { Target };
export type Token = Target | symbol | string;
export type InjectedMetaParam = { index: number; value: Token };
export type InjectableMetaDescriptor = { scope: string };

// providers
export type Providable = { token: Token; scope?: string };
export type ValueProvider = Providable & { useValue: unknown };
export type TypeProvider = Providable & { useType: Token };
export type FactoryProvider = Providable & { useFactory: Func };
export type Provider = ValueProvider & TypeProvider & FactoryProvider;

// module
export interface ModuleMetaDescriptor {
  imports: Target[];
  providers: (Target | Provider)[];
  exports: (Target | Provider)[];

  [key: string]: unknown;
}

export interface ModuleRef {
  get id(): string;

  get ref(): Target;

  get imports(): ModuleRef[];

  get exports(): Registry;

  get provides(): Registry;

  resolve<T = unknown>(target: Token): Promise<T>;
}
