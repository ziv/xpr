import { Target } from "./metadata.ts";
import { ModuleDescriptor } from "./module.ts";

export type Linkage = WeakMap<Target, ModuleDescriptor>;
export type Linker = (target: Target) => Promise<Linkage>;
