import type { LinkerOptions, ModuleMetaDescriptor, ModuleRef, Target, TargetProvider } from "./types.ts";
import { getLogger } from "jinn/common/deps/log.ts";
import { str } from "jinn/common/utils/mod.ts";
import { Meta, read } from "./metadata.ts";
import ProviderRegistry from "./provider-registry.ts";
import ModuleRegistry from "./module-registry.ts";
import Host from "./host.ts";


export default function linker(options: LinkerOptions = {}) {
  const { registry = new ModuleRegistry(), logger = getLogger() } = options;
  return function link(target: Target): ModuleRef {
    const { imports, providers, exports } = read<ModuleMetaDescriptor>(Meta.Module, target);

    // link the imported :)
    const imported: ModuleRef[] = imports.map((m) => registry.has(m) ? registry.fetch(m) : link(m));

    // register the providers!
    const provided: ProviderRegistry = providers.reduce(
      (r: ProviderRegistry, p: TargetProvider): ProviderRegistry => r.register(p),
      new ProviderRegistry(target).register(target)
    );

    // now some exports...
    const exported = exports.reduce(
      (r: ProviderRegistry, p: TargetProvider) => {
        if (provided.exists(p)) {
          return r.register(p);
        }
        if (registry.has(p)) {
          return r.import(registry.fetch(p).exports);
        }
        throw new Error(`unable to export ${str(p)}`);
      },
      new ProviderRegistry(target).register(provided.fetch(target))
    );

    return registry.save(target, new Host(target, imported, provided, exported, logger));
  };
}
