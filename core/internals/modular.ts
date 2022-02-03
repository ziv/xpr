import type Registry from "./registry.ts";
import type { ResolvedProvider, Resolver, Target, Token } from "./types.ts";
import { FactoryError, TokenNotFound } from "./errors.ts";

export interface ModularOptions {
  internals: Registry[];
  externals: Registry[];
  imported?: Modular[];
}

export default class Modular implements Resolver {
  readonly id: string;
  constructor(
    private readonly module: Target,
    private readonly options: ModularOptions,
  ) {
    this.id = `${(module as { name: string }).name}-${crypto.randomUUID()}`;
  }

  // get id() {
  //   return (this.module as { name: string }).name ?? "module";
  // }

  get exports() {
    return this.options.externals;
  }

  async resolve<T = unknown>(token: Token, defaultValue?: T): Promise<T> {
    console.log(`resolve ${String(token)} from ${this.id}`);
    for (const register of this.options.internals) {
      console.log(`search registry of ${(register.module as Function).name}`);
      if (register.has(token)) {
        console.log(`found in registry of ${(register.module as Function).name}`);
        const provider: ResolvedProvider = register.get(
          token,
        ) as unknown as ResolvedProvider;
        if (!provider.data) {
          try {
            console.log("provider", provider);
            // @ts-ignore
            provider.data = await provider.factory(this);
          } catch (e) {
            console.log(e);
            Deno.exit(1);
            throw new FactoryError(token, e);
          }
        }
        return provider.data as T;
      }
    }
    if (this.options.imported) {
      // deep mode (strict mode disabled)
      const df = Symbol("defaultValue") as never as T;
      for (const imported of this.options.imported) {
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
