import type { FactoryProvider, Linkage, ModuleDescriptor, ModuleHost, ModuleRegistry } from "core/types/mod.ts";
import type { Emitter } from "common/emitter/mod.ts";
import Registry from "./registry.ts";
import provider from "./provider.ts";
import Host from "./host.ts";

const assert = (value: unknown, message: string) => {
  if (!value) {
    throw new Error(message);
  }
};

const isFactoryProvider = (p: unknown): boolean =>
  !!((p as FactoryProvider).token) && !!((p as FactoryProvider).factory);

export interface CompilerOptions {
  registry: Linkage;
  emitter: Emitter;
}

export type Compiler = (definition: ModuleDescriptor) => Promise<ModuleHost>;

export default function compiler({ registry, emitter }: CompilerOptions): Compiler {
  // "compiler" context emitter
  const emit = (action: string, payload?: unknown) => emitter.emit("compiler", { action, payload });

  return async function compile({ imports, providers, exports, module }: ModuleDescriptor): Promise<ModuleHost> {
    emit("compile", { module });

    const bail = (content: string) => {
      const error = new Error(content);
      emit("error", { module, content, error });
      throw error;
    };

    const internal = new Registry(module);
    const external = new Registry(module);

    const internals: ModuleRegistry[] = [internal];
    const externals: ModuleRegistry[] = [external];
    const imported = [];

    for (const im of imports.reverse()) {
      emit("import", { import: im, module });
      assert(registry.has(im), "module not exists in registry");
      const defs = registry.get(im) as ModuleDescriptor;
      if (!defs.host) {
        defs.host = await compile(defs);
      }
      internals.push(...defs.host.exports);
      imported.push(defs.host as ModuleHost);
      emit("imported", { import: im, resolved: defs.host, module });
    }

    for (const pr of providers.reverse()) {
      if (isFactoryProvider(pr)) {
        emit("register factory provider", { provider: pr, module });
        internal.register(pr as FactoryProvider);
      } else if (typeof pr === "function") {
        emit("register type provider", { provider: pr, module });
        internal.register(provider(pr));
      } else {
        bail(`unable to register provider ${String(pr)}`);
      }
    }

    for (const ex of exports.reverse()) {
      if (registry.has(ex)) {
        emit("register exported module", { exported: ex, module });
        const resolved = registry.get(ex)?.host as ModuleHost;
        externals.push(...resolved.exports);
      } else if (internal.has(ex)) {
        emit("register exported type", { exported: ex, module });
        external.register(internal.get(ex) as FactoryProvider);
      } else if (isFactoryProvider(ex) && internal.has((ex as FactoryProvider).token)) {
        emit("register exported provider", { provider: ex, module });
        external.register(internal.get((ex as FactoryProvider).token) as FactoryProvider);
      } else {
        bail(`unable to register exported ${String(ex)}`);
      }
    }

    const host = new Host(module, imported, internals, externals, emitter);
    registry.set(module, { module, exports, providers, imports, host });
    return host;
  };
}
