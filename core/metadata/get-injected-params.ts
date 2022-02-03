import { InjectedParam, Target } from "core/types/mod.ts";
import { PARAMS_DEFINITION } from "./consts.ts";

export default function getInjectedParams(target: Target): InjectedParam[] {
  return Reflect.getMetadata(PARAMS_DEFINITION, target) ?? [];
}
