import type { ModuleDescriptor, Target } from "core/types/mod.ts";
import { MODULE_DEFINITION } from "./consts.ts";

export default function getModuleDefinition(target: Target): ModuleDescriptor {
  return Reflect.getMetadata(MODULE_DEFINITION, target) as ModuleDescriptor;
}
