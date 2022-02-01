import type { Target, Token } from "core/internals/types.ts";
import TypesInfo from "core/internals/types-info.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    TypesInfo.merge(target, { [parameterIndex]: token ?? target });
  };
}
