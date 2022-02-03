import type { Target } from "../types/metadata.ts";
import type { ModuleDescriptor } from "../types/module.ts";
import { MODULE_DEFINITION } from "./consts.ts";

const defaultDefinition = { imports: [], providers: [], exports: [] };

export default function setModuleDefinition(target: Target, definitions: Partial<ModuleDescriptor>) {
  Reflect.defineMetadata(MODULE_DEFINITION, { ...defaultDefinition, ...definitions, module: target }, target);
}
