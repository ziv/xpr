import type { Target } from "../internals/reflection.ts";
import TypesInfo from "../internals/types-info.ts";
import { Token } from "../internals/types.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    TypesInfo.merge(target, { [parameterIndex]: token ?? target });
  };
}
