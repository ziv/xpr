import { Target, Token } from "core/types/metadata.ts";
import { ModuleRegistry } from "core/types/module.ts";
import { FactoryProvider } from "core/types/providers.ts";

export default class Registry extends Map<Token, FactoryProvider> implements ModuleRegistry {
  constructor(public readonly module: Target) {
    super();
  }

  register(provider: FactoryProvider) {
    this.set(provider.token, provider);
  }
}
