import type { Provider, Target, Token } from "./types.ts";
import { isCallable } from "jinn/common/utils/mod.ts";
import { Meta, read } from "./metadata.ts";

export type Key = Token | Provider;

const norm = (key: Key): Token => (key as Provider).token ?? key;

export default class ProviderRegistry extends Map<Token, Provider> {
  constructor(public readonly module: Target) {
    super();
  }

  fetch(key: Key): Provider {
    return this.get(norm(key)) as Provider;
  }

  exists(key: Key): boolean {
    return this.has(norm(key));
  }

  register(key: Key) {
    const provider = isCallable(key) ? read<Provider>(Meta.Injectable, key) : key as Provider;
    this.set(provider.token, provider);
    return this;
  }

  import(registry: ProviderRegistry) {
    for (const [token, provider] of registry.entries()) {
      if (!this.has(token)) {
        this.set(token, provider);
      }
    }
    return this;
  }
}
