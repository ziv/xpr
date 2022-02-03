import type { Target } from "../types/metadata.ts";
import { TS_PARAMTYPES } from "./consts.ts";

export default function getCtrParams(target: Target): Target[] {
  return Reflect.getMetadata(TS_PARAMTYPES, target) ?? [];
}
