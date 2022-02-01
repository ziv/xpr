import type Registrar from "./registrar.ts";
import type { ResolvedProvider, Resolver, Target, Token } from "./types.ts";
import { FactoryError, TokenNotFound } from "./errors.ts";

export interface ModularOptions {
  internals: Registrar[];
  externals: Registrar[];
  imported?: Modular[];
}

export default class Modular implements Resolver, ModularOptions {
  internals: Registrar[];
  externals: Registrar[];
  imported?: Modular[];

  constructor(
    private readonly module: Target,
    { internals, externals, imported }: ModularOptions,
  ) {
    this.internals = internals;
    this.externals = externals;
    this.imported = imported;
  }

  get id() {
    return (this.module as { name: string }).name ?? "module";
  }

  get exports() {
    return this.externals;
  }

  async resolve<T = unknown>(token: Token, defaultValue?: T): Promise<T> {
    for (const register of this.internals) {
      if (register.has(token)) {
        const provider = register.get(token) as ResolvedProvider;
        if (!provider.data) {
          try {
            provider.data = await provider.factory(this);
          } catch (e) {
            throw new FactoryError(token, e);
          }
        }
        return provider.data as T;
      }
    }
    if (this.imported) {
      // deep mode (strict mode disabled)
      const df = Symbol("defaultValue") as never as T;
      for (const imported of this.imported) {
        const data = await imported.resolve<T>(token, df);
        if (df !== data) {
          return data as T;
        }
      }
    }
    if (undefined !== defaultValue) {
      return defaultValue;
    }
    throw new TokenNotFound(token, this.id);
  }
}
