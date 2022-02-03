import type { FactoryProvider, ModularDefinition, Target } from "./types.ts";
import Modular from "./modular.ts";
import Registry from "./registry.ts";
import { isFactoryProvider } from "./utils.ts";
import resolver from "./resolver.ts";
import message from "./message.ts";
import Emitter from "../emitter/mod.ts";

const assert = (value: unknown, message: string) => {
  if (!value) {
    throw new Error(message);
  }
};

export interface CompilerOptions {
  strict?: boolean;
  emitter?: Emitter;
}
export type Compiler = (definition: ModularDefinition) => Promise<Modular>;

export default function compiler(
  registry: WeakMap<Target, ModularDefinition>,
  options: CompilerOptions = {},
): Compiler {
  return async function compile(
    { imports, providers, exports, module }: ModularDefinition,
  ): Promise<Modular> {
    const emit = (action: string, payload: unknown = undefined) =>
      // @ts-ignore
      options.emitter?.next(message([module])(action, payload));

    const bail = (msg: string) => {
      const error = new Error(msg);
      // options.emitter?.next(message(module, "error", error));
      throw error;
    };

    const internal = new Registry(module);
    const external = new Registry(module);

    const internals = [internal];
    const externals = [external];

    emit("compiling");
    for (const im of imports) {
      emit("import module", { imports: im });
      assert(registry.has(im), "module not exists in registry");
      const defs = registry.get(im) as ModularDefinition;
      if (!defs.resolved) {
        defs.resolved = await compile(defs);
      }
      emit("registering resolved module exports", {
        imported: im,
        resolved: defs.resolved,
      });
      internals.push(...defs.resolved.exports);
    }

    for (const pr of providers) {
      if (isFactoryProvider(pr)) {
        emit("register factory provider", { provider: pr });
        internal.register(pr as FactoryProvider);
      } else if (typeof pr === "function") {
        emit("register type provider", { provider: pr });
        internal.register({ token: pr, factory: resolver(pr) });
      } else {
        bail(`unable to register provider ${String(pr)}`);
      }
    }

    for (const ex of exports) {
      if (registry.has(ex)) {
        emit("register exported module", { exported: ex });
        const resolved = registry.get(ex)?.resolved as Modular;
        externals.push(...resolved.exports);
      } else if (internal.has(ex)) {
        emit("register exported type", { exported: ex });
        external.register(internal.get(ex) as FactoryProvider);
      } else if (
        isFactoryProvider(ex) &&
        internal.has((ex as FactoryProvider).token)
      ) {
        emit("register exported provider", { provider: ex });
        external.register(
          internal.get((ex as FactoryProvider).token) as FactoryProvider,
        );
      } else {
        bail(`unable to register exported ${String(ex)}`);
      }
    }

    // const imported = options.strict
    //   ? undefined
    //   : imports.map((i) => registry.get(i) as Modular);

    const resolved = new Modular(module, { internals, externals });
    registry.set(module, { module, exports, providers, imports, resolved });
    return resolved;
  };
}
