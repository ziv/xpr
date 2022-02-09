import type { ModuleDescriptor, Target } from "../njinn/types.ts";
import { setModuleMetadata } from "../njinn/metadata.ts";

export default function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setModuleMetadata(target, desc);
  };
}
