import type { Target, Token } from "../internals/mod.ts";
import addParam from "../metadata/add-param.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    addParam(target, { index: parameterIndex, value: token ?? target });
  };
}
