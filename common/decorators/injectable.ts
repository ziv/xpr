import type { InjectableDescriptor, Target } from "core/types/metadata.ts";
import { setInjectable } from "core/metadata/mod.ts";

export default function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setInjectable(target, desc);
  };
}
