import type { ModuleDescriptor, Target } from "../types.ts";
import { setModuleMetadata } from "../metadata.ts";

export default function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setModuleMetadata(target, desc);
  };
}
