import type { ModuleDescriptor, Target } from "common/types/mod.ts";
import { setModuleMetadata } from "../metadata.ts";

export default function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setModuleMetadata(target, desc);
  };
}
