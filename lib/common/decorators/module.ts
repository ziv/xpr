import type { Target } from "core/types/metadata.ts";
import type { ModuleDescriptor } from "core/types/module.ts";
import { setModuleDefinition } from "core/metadata/mod.ts";

export default function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setModuleDefinition(target, desc);
  };
}
