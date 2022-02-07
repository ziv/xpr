import { Target, Token } from "common/types/mod.ts";
import { addParam } from "../metadata.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    addParam(target, parameterIndex, token ?? target);
  };
}
