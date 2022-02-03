import { ModuleDescriptor, ModuleHost } from "./module.ts";

export type Compiler = (definition: ModuleDescriptor) => Promise<ModuleHost>;
