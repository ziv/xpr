import type { Func } from "core/types/reflection.ts";
import type { Token } from "core/types/metadata.ts";
import type { ModuleHost } from "core/types/module.ts";
import type { ResolverResponse } from "core/types/resolver.ts";
import StrictHost from "./strict-host.ts";

// todo change that to list or resolvers to iterate them!!!!
export default class LooseHost extends StrictHost implements ModuleHost {
  get id() {
    return `LooseHost(${(this.module as Func).name})`;
  }

  async resolve(token: Token): Promise<ResolverResponse> {
    const internal = await super.resolve(token);
    if (internal.resolved || internal.error) {
      return internal;
    }
    for (const im of this.imported) {
      const external = await im.resolve(token);
      if (external.resolved || external.error) {
        return external;
      }
    }
    return { resolved: false };
  }
}
