import type { Linkage, Linker, ModuleDescriptor, ModuleHost, Target } from "core/types/mod.ts";
import { compiler, linker } from "core/internals/mod.ts";
import { Emitter } from "common/emitter/mod.ts";

export interface ContextOptions {
  emitter?: Emitter;
  linker?: Linker;
}

export default async function context(module: Target, options: ContextOptions): Promise<[ModuleHost, Linkage, Emitter]> {
  // defaults
  const link = options.linker ?? linker();
  const emitter = options.emitter ?? new Emitter();

  // local emitter
  const emit = (action: string, payload?: unknown) => emitter.emit("context", { action, payload });

  const registry = link(module);
  const descriptor = registry.get(module) as ModuleDescriptor;
  emit("registry", { descriptor });

  const ctx = await compiler({ registry, emitter })(descriptor);
  emit("compiled", ctx);

  return [ctx, registry, emitter];
}
