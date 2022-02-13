import type { Logger } from "jinn/common/deps/mod.ts";
import type { Target } from "jinn/core/reflection/reflection.ts";
import type ProviderRegistry from "./provider-registry.ts";

// internals
// deno-lint-ignore ban-types
export type Func<TFunction = Function> = TFunction;

// injection
export type { Target, ProviderRegistry };
export type Token = Target | symbol | string;
export type InjectedMetaParam = { index: number; value: Token };
export type InjectableMetaDescriptor = { scope: string };

// providers
export type Providable = { token: Token; scope?: string };
export type ValueProvider = Providable & { useValue: unknown };
export type TypeProvider = Providable & { useType: Token };
export type FactoryProvider = Providable & { useFactory: Func };
export type Provider = ValueProvider & TypeProvider & FactoryProvider;

export type TargetProvider = Target | Provider;

// module
export interface ModuleMetaDescriptor {
  imports: Target[];
  providers: TargetProvider[];
  exports: TargetProvider[];
}

export interface ModuleRef {
  get id(): string;

  get ref(): Target;

  get imports(): ModuleRef[];

  get exports(): ProviderRegistry;

  get provides(): ProviderRegistry;

  resolve<T = unknown>(target: Token): Promise<T>;
}

// linker
export type LinkerRegistry =
  & WeakMap<Target, ModuleRef>
  & { fetch: (target: Target) => ModuleRef; save: (target: Target, ref: ModuleRef) => ModuleRef };
export type LinkerOptions = { registry?: LinkerRegistry; logger?: Logger };
