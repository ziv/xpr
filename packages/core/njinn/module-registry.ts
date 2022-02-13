import { Target } from "../reflection/reflection.ts";
import { LinkerRegistry, ModuleRef } from "./types.ts";

export default class ModuleRegistry extends WeakMap<Target, ModuleRef> implements LinkerRegistry {
  fetch(target: Target): ModuleRef {
    return this.get(target) as ModuleRef;
  }

  save(target: Target, ref: ModuleRef): ModuleRef {
    this.set(target, ref);
    return ref;
  }
}
