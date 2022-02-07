import type { Target } from "common/types/mod.ts";
import { noop, str } from "common/utils/mod.ts";
import { getModuleDescriptor } from "./metadata.ts";
import Host from "./host.ts";
import Registry from "./registry.ts";

enum LinkerActions {
  Link = "Link",
  Import = "Import",
  Provide = "Provide",
  Export = "Export",
  Linked = "Linked"
}

export default function linker(registry = new WeakMap<Target, Host>(),
                               emitter?: (payload: unknown) => void) {
  return async function link(target: Target): Promise<Host> {
    const emit = emitter
      ? (message: string, payload?: unknown) => emitter({ context: str(target), message, payload })
      : noop;
    const { imports, providers, exports } = getModuleDescriptor(target);
    emit(LinkerActions.Link, { target });

    // link the imported :)
    const imported: Host[] = [];
    for (const module of imports.reverse()) {
      emit(LinkerActions.Import, { target, module });
      const resolved = registry.has(module) ? registry.get(module) : await link(module);
      imported.push(resolved as Host);
    }

    // register the providers!
    const provided = new Registry(target);
    for (const provider of providers.reverse()) {
      emit(LinkerActions.Provide, { target, provider });
      provided.register(provider);
    }

    // now some exports...
    const exported = new Registry(target);
    for (const exp of exports.reverse()) {
      emit(LinkerActions.Export, { target, exp });
      if (registry.has(exp)) {
        [...(registry.get(exp) as Host).exports.values()].forEach(exported.register);
      } else if (provided.exists(exp)) {
        exported.register(provided.fetch(exp));
      } else {
        throw new Error(`unable to export ${str(exp)}`);
      }
    }

    const host = new Host(target, imported, provided, exported, emit);
    registry.set(target, host);
    emit(LinkerActions.Linked, { target, host });
    return host;
  };
}
