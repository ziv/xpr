import type { Target, Token } from "core/types/metadata.ts";
import { InjectedParam } from "core/types/metadata.ts";
import { PARAMS_DEFINITION } from "core/metadata/mod.ts";

export default function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    const params: InjectedParam[] = Reflect.getMetadata(PARAMS_DEFINITION, target) ?? [];
    Reflect.defineMetadata(
      PARAMS_DEFINITION,
      [...params, { index: parameterIndex, value: token ?? target }],
      target
    );
  };
}
