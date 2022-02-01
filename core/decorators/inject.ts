import type { Target, Token } from "../internals/mod.ts";
import { TypesInfo } from "../internals/mod.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    TypesInfo.merge(target, { [parameterIndex]: token ?? target });
  };
}
