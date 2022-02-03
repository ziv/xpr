import { InjectedParam, Target } from "core/types/metadata.ts";
import { PARAMS_DEFINITION } from "./consts.ts";

export default function getInjectedParams(target: Target): InjectedParam[] {
  return Reflect.getMetadata(PARAMS_DEFINITION, target) ?? [];
}
