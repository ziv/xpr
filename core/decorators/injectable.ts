import type { InjectableDescriptor, Target } from "../njinn/types.ts";
import { setInjectable } from "../njinn/metadata.ts";

export default function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setInjectable(target, desc.scope);
  };
}
