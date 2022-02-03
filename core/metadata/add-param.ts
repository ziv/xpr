import type { InjectedParam, Target } from "../types/metadata.ts";
import { PARAMS_DEFINITION } from "./consts.ts";

export default function addParam(target: Target, param: InjectedParam) {
  const params: InjectedParam[] = Reflect.getMetadata(PARAMS_DEFINITION, target) ?? [];
  params.push(param);
  Reflect.defineMetadata(PARAMS_DEFINITION, params, target);
}
