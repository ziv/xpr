import type { InjectableDescriptor, Target } from "core/types/metadata.ts";
import { INJECTABLE_DEFINITION, NoScope } from "./consts.ts";

export default function setInjectable(target: Target, definitions: Partial<InjectableDescriptor>) {
  Reflect.defineMetadata(INJECTABLE_DEFINITION, { scope: NoScope, ...definitions }, target);
}
