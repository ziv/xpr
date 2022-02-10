import type { ModuleRef, Target } from "./types.ts";
import { str } from "xpr/common/utils/mod.ts";
import Registry from "./registry.ts";
import Host from "./host.ts";
import { getModuleDescriptor } from "./metadata.ts";

export type LinkerRegistry = WeakMap<Target, ModuleRef>;
export type LinkerOptions = { registry?: LinkerRegistry };

export default function linker(options: LinkerOptions) {
  const { registry = new WeakMap<Target, ModuleRef>() } = options;
  return function link(target: Target): Host {
    const { imports, providers, exports } = getModuleDescriptor(target);

    // link the imported :)
    const imported: ModuleRef[] = [];
    for (const module of imports.reverse()) {
      const resolved = registry.has(module) ? registry.get(module) : link(module);
      imported.push(resolved as ModuleRef);
    }

    // register the providers!
    const provided = new Registry(target);
    for (const provider of providers.reverse()) {
      provided.register(provider);
    }

    // now some exports...
    const exported = new Registry(target);
    for (const exp of exports.reverse()) {
      if (registry.has(exp)) {
        [...(registry.get(exp) as ModuleRef).exports.values()].forEach(exported.register.bind(exported));
      } else if (provided.exists(exp)) {
        exported.register(provided.fetch(exp));
      } else {
        throw new Error(`unable to export ${str(exp)}`);
      }
    }

    const host = new Host(target, imported, provided, exported);
    registry.set(target, host);
    return host;
  };
}
