import type { Target, Token } from "core/types/metadata.ts";
import { addParam } from "core/metadata/mod.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    addParam(target, { index: parameterIndex, value: token ?? target });
  };
}
