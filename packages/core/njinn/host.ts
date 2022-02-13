import type { Func, InjectedMetaParam, ModuleRef, Provider, ProviderRegistry, Target, Token } from "./types.ts";
import { str } from "jinn/common/utils/mod.ts";
import { Logger } from "jinn/common/deps/log.ts";
import { Meta, read, Scopes } from "./metadata.ts";

// todo error handler

export default class Host implements ModuleRef {
  /**
   * Static (singleton/global) cache
   * @private
   */
  private static readonly global = new Map<Token, unknown>();

  /**
   * Module cache
   * @private
   */
  private readonly cache = new Map<Token, unknown>();
  protected readonly logger: Logger;

  constructor(
    protected readonly module: Target,
    protected readonly imported: ModuleRef[],
    protected readonly provided: ProviderRegistry,
    protected readonly exported: ProviderRegistry,
    { levelName, handlers }: Logger
  ) {
    this.logger = new Logger(this.id, levelName, { handlers });
  }

  get ref(): Target {
    return this.module;
  }

  get id(): string {
    return str(this.module);
  }

  get imports(): ModuleRef[] {
    return this.imported;
  }

  get exports(): ProviderRegistry {
    return this.exported;
  }

  get provides(): ProviderRegistry {
    return this.provided;
  }

  async resolve<T = unknown>(target: Token): Promise<T> {
    this.logger.debug("resolving %#v", target);

    // is this target already cached (locally)?
    if (this.cache.has(target)) {
      this.logger.debug("token %#v found in cache", target);
      return this.cache.get(target) as T;
    }

    // is this target already cached (globally)?
    if (Host.global.has(target)) {
      this.logger.debug("token %#v found in global cache", target);
      return Host.global.get(target) as T;
    }

    // the search for provider
    const provider = this.provider(target);

    // the creation
    const value = await this.value<T>(provider, target as Target);

    // should we cache?!
    switch (provider.scope) {
      case Scopes.Default: // singleton
        Host.global.set(target, value);
        break;
      case Scopes.Module: // each module
        this.cache.set(target, value);
        break;
      case Scopes.None: // new instance for each resolving
        break;
    }
    return value;
  }

  private provider(target: Token): Provider {
    this.logger.debug("search for token %#v in local module", target);
    if (this.provided.has(target)) {
      this.logger.debug("provider for token %#v found in local providers", target);
      return this.provides.get(target) as Provider;
    }
    for (const mdl of this.imported) {
      this.logger.debug("search for token %#v in module %s", target, mdl.id);
      if (mdl.exports.has(target)) {
        this.logger.debug("provider for token %#v found in module %s", target, mdl.id);
        return mdl.provides.get(target) as Provider;
      }
    }
    throw new Error(`unable to find provider for ${str(target)}`);
  }

  private async value<T>(provider: Provider, target: Target): Promise<T> {
    this.logger.debug("providing %j from %s", provider, this.id);

    if (provider.useValue) {
      return provider.useValue as T;
    }

    if (provider.useFactory) {
      return await provider.useFactory(this);
    }

    if (provider.useType) {
      // constructor arguments
      const ctr: Token[] = read<Target[]>(Meta.Ctr, target, []);
      if (ctr.length) {
        // replace with injected tokens
        const injected = read<InjectedMetaParam[]>(Meta.Params, target, []);
        for (const { index, value } of injected) {
          ctr[index] = value;
        }
      }
      // resolve dependencies
      const args: unknown[] = await Promise.all(ctr.map((type) => this.resolve(type)));
      // construct object
      return Reflect.construct(target as Func, args);
    }

    this.logger.debug("invalid provider %j", provider);
    throw new Error("invalid provider");
  }
}
