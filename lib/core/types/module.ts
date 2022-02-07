import type { Target } from "./reflection.ts";
import type { Token } from "./metadata.ts";
import type { FactoryProvider, Provider } from "./providers.ts";
import type { Resolver } from "./resolver.ts";

export interface ModuleRegistry extends Map<Token, FactoryProvider> {
  readonly module: Target;
}

export interface ModuleHost extends Resolver {
  readonly id: string;
  readonly module: Target;
  readonly exports: ModuleRegistry[];
}

export interface ModuleDescriptor {
  module: Target;
  imports: Target[];
  providers: Provider[];
  exports: Provider[];
  host?: ModuleHost;
}
