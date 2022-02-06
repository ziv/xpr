import type { Linkage, Linker, ModuleDescriptor, ModuleHost, Target } from "core/types/mod.ts";
import type { Emitter } from "core/emitter/mod.ts";
import { compiler, linker } from "core/internals/mod.ts";
import { noop } from "common/utils/mod.ts";

export interface ContextOptions {
  emitter: Emitter;
  linker: Linker;
  strict: boolean;
}

export default async function context(module: Target, options: Partial<ContextOptions> = {}): Promise<[ModuleHost, Linkage]> {
  const register = options.linker ?? linker();
  const emitter = options.emitter
    ? (event: string, payload?: unknown) => options.emitter?.next({ event, payload })
    : noop;

  const registry = await register(module);
  emitter("registry", { registry });

  const compile = compiler(registry, { emitter });


  return [
    await compile(registry.get(module) as ModuleDescriptor),
    registry
  ];
}
