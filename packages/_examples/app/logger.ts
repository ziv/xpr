import type { EmitterMessage } from "packages/core/mod.ts";
import { blue, green } from "./deps.ts";

export default function logger(data: EmitterMessage) {
  console.log(blue(data.context), green(data.message));
}
