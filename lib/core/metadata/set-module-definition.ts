import type { ModuleDescriptor, Target } from "core/types/mod.ts";
import { MODULE_DEFINITION } from "./consts.ts";

const defaultDesc = { imports: [], providers: [], exports: [] };

export default function setModuleDefinition(target: Target, desc: Partial<ModuleDescriptor>) {
  Reflect.defineMetadata(MODULE_DEFINITION, { ...defaultDesc, ...desc, module: target }, target);
}
