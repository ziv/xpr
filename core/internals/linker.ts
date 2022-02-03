import type { Linkage, Linker, ModuleDescriptor, Target } from "core/types/mod.ts";
import { getModuleDefinition } from "core/metadata/mod.ts";

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
