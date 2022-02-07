import type { Linkage, Linker, ModuleDescriptor, Target } from "core/types/mod.ts";
import { getModuleDefinition } from "core/metadata/mod.ts";

/**
 * Return a function Linker that takes a module (type) and build a module registry.
 * Module registry is a mapper from module (type) to module descriptor.
 *
 * @param registry
 * @return Linker
 */
export default function linker(registry = new WeakMap<Target, ModuleDescriptor>()): Linker {
  return function ast(module: Target): Linkage {
    const definition = getModuleDefinition(module);
    registry.set(module, definition);
    for (const im of definition.imports) {
      if (!registry.has(im)) {
        ast(im);
      }
    }
    return registry;
  };
}
