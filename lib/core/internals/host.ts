import type {
  Func,
  ModuleHost,
  ModuleRegistry,
  ResolvedProvider,
  ResolverResponse,
  Target,
  Token
} from "core/types/mod.ts";
import { ModuleScope, NoScope } from "core/metadata/mod.ts";
import { Emitter } from "common/emitter/mod.ts";

export default class Host implements ModuleHost {
  constructor(
    public readonly module: Target,
    public readonly imported: ModuleHost[],
    public readonly internals: ModuleRegistry[],
    public readonly externals: ModuleRegistry[],
    public readonly emitter: Emitter
  ) {
  }

  get id() {
    return `Host(${(this.module as Func).name})`;
  }

  get exports() {
    return this.externals;
  }

  select(module: Target) {
    return this.imported.find(m => m.module === module);
  }

  async get<T = unknown>(token: Token): Promise<T> {
    const resolved = await this.resolve(token);
    if (resolved.resolved) {
      return resolved.value as T;
    }
    throw new Error(`unable to resolve ${String(token)}`);
  }

  async resolve(token: Token): Promise<ResolverResponse> {
    for (const register of this.internals) {
      if (register.has(token)) {
        let provider = register.get(token) as unknown as ResolvedProvider;
        if (provider.scope === ModuleScope && register !== this.internals[0]) {
          this.internals[0].set(token, { token, factory: provider.factory });
          provider = this.internals[0].get(token) as unknown as ResolvedProvider;
        }
        if (provider.scope === NoScope) {
          provider = { token, factory: provider.factory } as unknown as ResolvedProvider;
        }
        try {
          if (!provider.data) {
            provider.data = await provider.factory(this);
          }
          return { resolved: true, value: provider.data };
        } catch (error) {
          return { resolved: false, error };
        }
      }
    }
    return { resolved: false };
  }
}
