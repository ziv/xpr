import type { Target, Token } from "./types.ts";
import type Host from "./host.ts";
import linker from "./linker.ts";

export default class Context {
  static async create(module: Target, e: any) {
    const registry = new WeakMap<Target, Host>();
    const host = await linker(registry, e)(module);
    return new Context(host, registry);
  }

  constructor(public readonly host: Host,
              public readonly registry: WeakMap<Target, Host>) {
  }

  select(module: Target): Host | undefined {
    return this.registry.get(module);
  }

  resolve<T = unknown>(token: Token): Promise<T> {
    return this.host.resolve<T>(token);
  }
}
