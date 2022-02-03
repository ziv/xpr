import type { InjectableDescriptor, Target } from "core/types/mod.ts";
import { INJECTABLE_DEFINITION } from "./consts.ts";

export default function getInjectable(target: Target): InjectableDescriptor {
  return Reflect.getMetadata(INJECTABLE_DEFINITION, target) as InjectableDescriptor;
}
