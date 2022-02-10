import type { Provider, Target, Token } from "./types.ts";
import { getInjectable } from "./metadata.ts";
import { isCallable } from "./utils.ts";

export type Key = Token | Provider;

const norm = (key: Key): Token => (key as Provider).token ?? key;

export default class Registry extends Map<Token, Provider> {
  constructor(public readonly module: Target) {
    super();
  }

  fetch(token: Key): Provider {
    return this.get(norm(token)) as Provider;
  }

  exists(token: Key): boolean {
    return this.has(norm(token));
  }

  register(provider: Key) {
    const p = isCallable(provider) ? getInjectable(provider) : provider as Provider;
    this.set(p.token, p);
    return this;
  }
}
