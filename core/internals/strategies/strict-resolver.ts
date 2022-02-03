import type Registry from "../registry.ts";
import type { ResolvedProvider, ResolverResponse, Token } from "../types.ts";
import type { StrategyOptions } from "./types.ts";
import type Modular from "../modular.ts";
import Emitter from "../../emitter/mod.ts";

export default function strictResolver(
  options: Pick<StrategyOptions, "internals">,
  emitter?: Emitter,
) {
  const registries = options.internals as Registry[];
  return async function resolve(
    modular: Modular,
    token: Token,
  ): Promise<ResolverResponse> {
    for (const register of registries) {
      if (register.has(token)) {
        const provider = register.get(token) as unknown as ResolvedProvider;
        if (!provider.data) {
          try {
            provider.data = await provider.factory(modular);
          } catch (error) {
            return { resolved: false, error };
          }
        }
        return { resolved: true, value: provider.data };
      }
    }
    return { resolved: false };
  };
}
