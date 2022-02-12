import type { ModuleMetaDescriptor, ModuleRef, Target } from "./types.ts";
import { str } from "jinn/common/utils/mod.ts";
import { Meta, read } from "./metadata.ts";
import Registry from "./registry.ts";
import Host from "./host.ts";

export type LinkerRegistry = WeakMap<Target, ModuleRef>;
export type LinkerOptions = { registry?: LinkerRegistry };

export const linkerRegistry = () => new WeakMap<Target, ModuleRef>();

export default function linker(options: LinkerOptions) {
  const { registry = linkerRegistry() } = options;
  return function link(target: Target): Host {
    const { imports, providers, exports } = read<ModuleMetaDescriptor>(Meta.Module, target);

    // link the imported :)
    const imported: ModuleRef[] = [];
    for (const module of imports.reverse()) {
      const resolved = registry.has(module) ? registry.get(module) : link(module);
      imported.push(resolved as ModuleRef);
    }

    // register the providers!
    const provided = new Registry(target);
    provided.register(target);
    for (const provider of providers.reverse()) {
      provided.register(provider);
    }

    // now some exports...
    const exported = new Registry(target);
    exported.register(provided.fetch(target));
    const register = exported.register.bind(exported);
    for (const exp of exports.reverse()) {
      if (registry.has(exp)) {
        [...(registry.get(exp) as ModuleRef).exports.values()].forEach(register);
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
