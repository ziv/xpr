import type { FactoryProvider, ModularDefinition, Target } from "./types.ts";
import TypesInfo from "./types-info.ts";
import Modular from "./modular.ts";
import Registrar from "./registrar.ts";
import { isFactoryProvider, normalizeProvider } from "./utils.ts";
import { Subject } from "./deps.ts";

export interface CompilerOptions {
  strict: boolean;
  emitter?: Subject;
}

export type Compiler = (target: Target) => Promise<Modular>;

export default function compiler(
  registry: WeakMap<Target, Modular>,
  options: Partial<CompilerOptions> = {},
): Compiler {
  return async function compile(target: Target): Promise<Modular> {
    // todo add more checks here
    if (!TypesInfo.has(target)) {
      const name = (target as { name: string }).name ?? target;
      throw new Error(`${name} is not a module (no type)`);
    }
    const info = TypesInfo.get<ModularDefinition>(target);
    if (!info.exports || !info.imports || !info.providers) {
      const name = (target as { name: string }).name ?? target;
      throw new Error(`${name} is not a module (no definitions)`);
    }

    const { imports, providers, exports } = info;

    const internal = new Registrar(target);
    const external = new Registrar(target);

    const internals = [internal];
    const externals = [external];

    for (const im of imports) {
      const resolved: Modular = registry.has(im)
        ? registry.get(im) as Modular
        : await compile(im);
      internals.push(...resolved.exports);
    }

    for (const pr of providers) {
      internal.register(normalizeProvider(pr));
    }

    for (const ex of exports) {
      if (registry.has(ex)) {
        // it is a module! take its exports
        externals.push(...(registry.get(ex) as Modular).exports);
      } else if (TypesInfo.has(ex) && internal.has(ex)) {
        // it is injectable! take its internal provider
        external.register(internal.get(ex) as FactoryProvider);
      } else if (isFactoryProvider(ex as FactoryProvider)) {
        // it is provider! take its internal provider
        external.register(
          internal.get((ex as FactoryProvider).token) as FactoryProvider,
        );
      } else {
        throw new Error(`unable to export ${ex}`);
      }
    }

    const imported = options.strict
      ? undefined
      : imports.map((i) => registry.get(i) as Modular);

    const modular = new Modular(target, { internals, externals, imported });
    registry.set(target, modular);
    return modular;
  };
}
