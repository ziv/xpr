import type { Target } from "core/types/metadata.ts";
import type { ModuleDescriptor } from "core/types/module.ts";
import { MODULE_DEFINITION } from "./consts.ts";

export default function getModuleDefinition(target: Target): ModuleDescriptor {
  return Reflect.getMetadata(MODULE_DEFINITION, target) as ModuleDescriptor;
}
