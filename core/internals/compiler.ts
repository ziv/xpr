import type { ModuleDescriptor, ModuleHost, ModuleRegistry } from "core/types/module.ts";
import type { FactoryProvider } from "core/types/providers.ts";
import type { Linkage } from "./linker.ts";
import Registry from "./registry.ts";
import StrictHost from "./strategies/strict-host.ts";
import LooseHost from "./strategies/loose-host.ts";
import provider from "./provider.ts";

const noop = (..._: unknown[]) => undefined;
const assert = (value: unknown, message: string) => {
  if (!value) {
    throw new Error(message);
  }
};

const isFactoryProvider = (p: unknown): boolean =>
  !!((p as FactoryProvider).token) && !!((p as FactoryProvider).factory);

export interface CompilerOptions {
  strict?: boolean;
  emitter?: (...args: unknown[]) => void;
}

export type Compiler = (definition: ModuleDescriptor) => Promise<ModuleHost>;

export default function compiler(registry: Linkage, options: CompilerOptions = {}): Compiler {
  const emit = options.emitter ?? noop;

  return async function compile({ imports, providers, exports, module }: ModuleDescriptor): Promise<ModuleHost> {
    emit({ content: "compile", module });

    const bail = (content: string) => {
      const error = new Error(content);
      emit({ module, content, error });
      throw error;
    };

    const internal = new Registry(module);
    const external = new Registry(module);

    const internals: ModuleRegistry[] = [internal];
    const externals: ModuleRegistry[] = [external];

    for (const im of imports.reverse()) {
      emit({ content: "import", import: im, module });
      assert(registry.has(im), "module not exists in registry");
      const defs = registry.get(im) as ModuleDescriptor;
      if (!defs.host) {
        defs.host = await compile(defs);
      }
      internals.push(...defs.host.exports);
      emit({ content: "imported", import: im, resolved: defs.host, module });
    }

    for (const pr of providers.reverse()) {
      if (isFactoryProvider(pr)) {
        emit({ content: "register factory provider", provider: pr, module });
        internal.register(pr as FactoryProvider);
      } else if (typeof pr === "function") {
        emit({ content: "register type provider", provider: pr, module });
        internal.register(provider(pr));
      } else {
        bail(`unable to register provider ${String(pr)}`);
      }
    }

    for (const ex of exports.reverse()) {
      if (registry.has(ex)) {
        emit({ content: "register exported module", exported: ex, module });
        const resolved = registry.get(ex)?.host as ModuleHost;
        externals.push(...resolved.exports);
      } else if (internal.has(ex)) {
        emit({ content: "register exported type", exported: ex, module });
        external.register(internal.get(ex) as FactoryProvider);
      } else if (isFactoryProvider(ex) && internal.has((ex as FactoryProvider).token)) {
        emit({ content: "register exported provider", provider: ex, module });
        external.register(internal.get((ex as FactoryProvider).token) as FactoryProvider);
      } else {
        bail(`unable to register exported ${String(ex)}`);
      }
    }

    // todo should come from factory
    const imported = () => imports.map((i) => (registry.get(i) as ModuleDescriptor).host as ModuleHost);
    const resolved = options.strict
      ? new StrictHost(module, internals, externals, imported())
      : new LooseHost(module, internals, externals, imported());

    registry.set(module, { module, exports, providers, imports, host: resolved });
    return resolved;
  };
}
