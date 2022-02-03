import type { Target } from "../types/metadata.ts";
import type { ModuleDescriptor } from "../types/module.ts";
import { MODULE_DEFINITION } from "./consts.ts";

export default function getModuleDefinition(target: Target): ModuleDescriptor {
  return Reflect.getMetadata(MODULE_DEFINITION, target) as ModuleDescriptor;
}
