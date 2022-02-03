import type Registry from "../registry.ts";
import type Modular from "../modular.ts";

export interface StrategyOptions {
  internals: Registry[];
  externals: Registry[];
  imported: Modular[];
}
