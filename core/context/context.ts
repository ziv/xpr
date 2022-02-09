import type { Emitter, Target, Token } from "../njinn/mod.ts";
import type Host from "../njinn/host.ts";
import linker from "../njinn/linker.ts";

export interface ContextOptions {
  module: Target;
  emitter?: Emitter;
}

export default class Context {
  static from<A = unknown, B = unknown>({ module, emitter }: ContextOptions): Promise<Context>;
  static async from({ module, emitter }: ContextOptions) {
    const registry = new WeakMap<Target, Host>();
    const host = await linker<Host>({ registry, emitter })(module);
    return new Context(host, registry);
  }

  constructor(public readonly host: Host, public readonly registry: WeakMap<Target, Host>) {
  }

  select(module: Target): Host | undefined {
    return this.registry.get(module);
  }

  resolve<T = unknown>(token: Token): Promise<T> {
    return this.host.resolve<T>(token);
  }
}
