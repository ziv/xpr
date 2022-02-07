import type { Target } from "core/types/metadata.ts";
import type { ModuleDescriptor } from "core/types/module.ts";
import { MODULE_DEFINITION } from "core/metadata/mod.ts";

const defaultDesc = { imports: [], providers: [], exports: [] };

export default function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    Reflect.defineMetadata(MODULE_DEFINITION, { ...defaultDesc, ...desc, module: target }, target);
  };
}
