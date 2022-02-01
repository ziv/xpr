import type { Target } from "./reflection.ts";
import type { FactoryProvider, ModularDefinition } from "./types.ts";
import TypesInfo from "./types-info.ts";
import Modular from "./modular.ts";
import Registrar from "./registrar.ts";
import { isFactoryProvider, normalizeProvider } from "./utils.ts";

export interface CompilerOptions {
  strict: boolean;
}

export default function compiler(
  registry: WeakMap<Target, Modular>,
  options: Partial<CompilerOptions> = {},
) {
  return async function compile(target: Target): Promise<Modular> {
    // todo add more checks here
    if (!TypesInfo.has(target)) {
      const name = (target as { name: string }).name ?? target;
      throw new Error(`${name} is not a module`);
    }

    const { imports, providers, exports } = TypesInfo.get<ModularDefinition>(
      target,
    );

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
        // todo... should have access to creator provider?!
        console.log(internal.get(ex));
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

    const modular = new Modular(
      target,
      internals,
      externals,
      imported,
    );
    registry.set(target, modular);
    return modular;
  };
}
