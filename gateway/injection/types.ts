import { ModuleRef } from "xpr/core/mod.ts";

export type ControllerDescriptor = { prefix: string };
export type MethodDescriptor = { method: string; name: string; path: string };

export interface ControllerModuleRef extends ModuleRef {
  get gateway(): unknown;
}
