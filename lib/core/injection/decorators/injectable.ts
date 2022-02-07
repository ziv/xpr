import type { InjectableDescriptor, Target } from "common/types/mod.ts";
import { setInjectable } from "../metadata.ts";

export default function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setInjectable(target, desc.scope);
  };
}
