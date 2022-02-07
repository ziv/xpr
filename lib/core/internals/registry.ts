import type { FactoryProvider, ModuleRegistry, Target, Token } from "core/types/mod.ts";

export default class Registry extends Map<Token, FactoryProvider> implements ModuleRegistry {
  constructor(public readonly module: Target) {
    super();
  }

  register(provider: FactoryProvider) {
    this.set(provider.token, provider);
  }
}
