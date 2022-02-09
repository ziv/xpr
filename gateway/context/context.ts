import type { Target } from "xpr/core/mod.ts";
import type Gateway from "../injection/gateway.ts";
import type { Adapter } from "../adapter/adapter.ts";
import { Context } from "xpr/core/mod.ts";
import linker from "xpr/core/njinn/linker.ts";
import gatewayFactory from "../injection/factory.ts";
import type { ContextOptions } from "../../core/context/context.ts";

export interface GatewayContextOptions<App, Router> extends ContextOptions {
  adapter: Adapter<App, Router>;
}

export default class GatewayContext extends Context {
  static async from<App, Router>({ module, adapter }: GatewayContextOptions<App, Router>): Promise<GatewayContext> {
    const registry = new WeakMap<Target, Gateway>();
    const next = await gatewayFactory(adapter);
    const host = await linker<Gateway>({ registry, next })(module);
    // the constructor should get an adapter
    return new GatewayContext(host, registry);
  }

  constructor(public readonly host: Gateway, public readonly registry: WeakMap<Target, Gateway>) {
    super(host, registry);
  }
}
