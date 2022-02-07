import type { InjectableDescriptor, Target } from "core/types/mod.ts";
import { DefaultScope, INJECTABLE_DEFINITION } from "./consts.ts";

export default function setInjectable(target: Target, definitions: Partial<InjectableDescriptor>) {
  Reflect.defineMetadata(INJECTABLE_DEFINITION, { scope: DefaultScope, ...definitions }, target);
}
