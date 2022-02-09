import { Target, Token } from "../njinn/types.ts";
import { addParam } from "../njinn/metadata.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    addParam(target, parameterIndex, token ?? target);
  };
}
