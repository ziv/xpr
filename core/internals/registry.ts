import type { FactoryProvider, Target, Token } from "./types.ts";

export default class Registry extends Map<Token, FactoryProvider> {
  constructor(public readonly module: Target) {
    super();
  }

  register(provider: FactoryProvider) {
    this.set(provider.token, provider);
  }
}
