import type { InjectableDescriptor, Target } from "core/types/metadata.ts";
import { DefaultScope, INJECTABLE_DEFINITION } from "core/metadata/mod.ts";

export default function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    Reflect.defineMetadata(INJECTABLE_DEFINITION, { scope: DefaultScope, ...desc }, target);
  };
}
