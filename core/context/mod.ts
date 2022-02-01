import type { Modular, Target } from "core/internals/mod.ts";
import { compiler } from "core/internals/mod.ts";
import Emitter from "core/emitter/mod.ts";

export interface ContextOptions {
  emitter?: Emitter;
  strict?: boolean;
  registry?: WeakMap<Target, Modular>;
}

export default class Context {
  readonly id = crypto.randomUUID();

  constructor(
    public readonly mod: Modular,
    public readonly emitter: Emitter
  ) {
  }

  static async create(
    module: Target,
    options: ContextOptions = {}
  ): Promise<Context> {
    const emitter = options.emitter ?? new Emitter(null);
    const strict = !!options.strict;
    const registry = options.registry ?? new WeakMap<Target, Modular>();

    const builder = compiler(registry, { strict, emitter });
    emitter.next(1);
    const mod = await builder(module);
    return new Context(mod, emitter);
  }
}
