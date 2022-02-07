import type { Func, Provider, Target, Token } from "./types.ts";
import type Registry from "./registry.ts";
import { str } from "xpr/common/utils/mod.ts";
import { getCtr, getParams, Scopes } from "./metadata.ts";

export type Emitter = (message: string, payload?: unknown) => void;

// todo error handler

export enum HostActions {
  Resolve = "Resolve",
  FoundInCache = "FoundInCache",
  FoundInGlobalCache = "FoundInGlobalCache",
  SearchForProviderIn = "SearchForProviderIn",
  ProviderFound = "ProviderFound",
  ProvidedFrom = "ProvidedFrom",
  InvalidProvider = "InvalidProvider"
}

export default class Host {
  private static readonly global = new Map<Token, unknown>();
  private readonly cache = new Map<Token, unknown>();


  constructor(private readonly module: Target,
              private readonly imported: Host[],
              private readonly provided: Registry,
              private readonly exported: Registry,
              private readonly emit: Emitter) {
  }

  get id(): string {
    return str(this.module);
  }

  get exports(): Registry {
    return this.exported;
  }

  async resolve<T = unknown>(target: Token): Promise<T> {
    this.emit(HostActions.Resolve, target);

    // is this target already cached?
    if (this.cache.has(target)) {
      this.emit(HostActions.FoundInCache, { target });
      return this.cache.get(target) as T;
    }

    if (Host.global.has(target)) {
      this.emit(HostActions.FoundInGlobalCache, { target });
      return Host.global.get(target) as T;
    }

    const provider = this.provider(target);
    const value = await this.value<T>(provider, target);
    const scope = provider.scope ?? Scopes.Default;

    switch (scope) {
      case Scopes.Default: // singleton
        Host.global.set(target, value);
        break;
      case Scopes.Module: // each module
        this.cache.set(target, value);
        break;
      case Scopes.None:
        // create new for each resolving
        break;
    }
    return value;
  }


  private provider(target: Token): Provider {
    // the search for provider
    for (const mdl of [this, ...this.imported]) {
      this.emit(HostActions.SearchForProviderIn, { target, module: mdl.id });
      if (mdl.exports.has(target)) {
        this.emit(HostActions.ProviderFound, { target, module: mdl.id });
        return mdl.provided.get(target) as Provider;
      }
    }
    throw new Error(`unable to find provider for ${str(target)}`);
  }

  private async value<T>(provider: Provider, target: Token): Promise<T> {
    this.emit(HostActions.ProvidedFrom, { module: this.id, provider });

    if (provider.useValue) {
      return provider.useValue as T;
    }

    if (provider.useFactory) {
      return await provider.useFactory(this);
    }

    if (provider.useType) {
      // constructor arguments
      const ctr: Target[] = getCtr(target as Target);
      if (ctr.length) {
        // replace with injected tokens
        const injected = getParams(target as Target);
        for (const { index, value } of injected) {
          ctr[index] = value as Target;
        }
      }
      // resolve dependencies
      const args: unknown[] = await Promise.all(ctr.map(type => this.resolve(type)));
      // construct object
      return Reflect.construct(target as Func, args);
    }

    this.emit(HostActions.InvalidProvider, { provider, target });
    throw new Error("invalid provider");
  }
}
