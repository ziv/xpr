import type { InjectableDescriptor, Target } from "../types.ts";
import { setInjectable } from "../metadata.ts";

export default function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setInjectable(target, desc.scope);
  };
}
