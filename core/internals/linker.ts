import type { Target } from "../types/metadata.ts";
import type { ModuleDescriptor } from "../types/module.ts";
import getModuleDefinition from "core/metadata/get-module-definition.ts";

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
