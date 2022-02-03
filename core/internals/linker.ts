import type { Target } from "core/types/metadata.ts";
import type { ModuleDescriptor } from "core/types/module.ts";
import { getModuleDefinition } from "core/metadata/mod.ts";

export type Linkage = WeakMap<Target, ModuleDescriptor>;
export type Linker = (target: Target) => Promise<Linkage>;

export default function linker(registry = new WeakMap<Target, ModuleDescriptor>()): Linker {
  return async function ast(module: Target): Promise<Linkage> {
    const definition = getModuleDefinition(module);
    registry.set(module, definition);
    for (const im of definition.imports) {
      if (!registry.has(im)) {
        await ast(im);
      }
    }
    return registry;
  };
}
