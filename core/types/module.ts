import type { Target } from "./reflection.ts";
import type { Provider } from "./providers.ts";
import type { Resolver } from "./resolver.ts";

export interface ModuleHost extends Resolver {
  readonly id: string;
  readonly module: Target;
}

export interface ModuleDescriptor {
  module: Target;
  imports: Target[];
  providers: Provider[];
  exports: Provider[];
  resolved?: ModuleHost;
}
