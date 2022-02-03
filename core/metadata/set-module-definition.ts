import type { Target } from "core/types/metadata.ts";
import type { ModuleDescriptor } from "core/types/module.ts";
import { MODULE_DEFINITION } from "./consts.ts";

const defaultDesc = { imports: [], providers: [], exports: [] };

export default function setModuleDefinition(target: Target, desc: Partial<ModuleDescriptor>) {
  Reflect.defineMetadata(MODULE_DEFINITION, { ...defaultDesc, ...desc, module: target }, target);
}
