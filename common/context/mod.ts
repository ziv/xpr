import type { Modular, Target } from "core/internals/mod.ts";
import { compiler } from "core/internals/mod.ts";
import { BehaviorSubject, Subject } from "./deps.ts";

export interface ContextOptions {
  strict?: boolean;
  // @ts-ignore
  emitter?: Subject;
}

export default class Context {
  readonly id = crypto.randomUUID();

  constructor(public readonly mod: Modular) {
  }

  static async create(
    module: Target,
    options: ContextOptions = {},
  ): Promise<Context> {
    const modulesRegistry = new WeakMap<Target, Modular>();
    // @ts-ignore
    const emitter = options.emitter ?? new BehaviorSubject<unknown>(null);
    const strict = !!options.strict;
    const mod = await compiler(modulesRegistry, { strict, emitter })(module);
    return new Context(mod);
  }
}
