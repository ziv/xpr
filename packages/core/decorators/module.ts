import type { Target } from "../internals/reflection.ts";
import type { ModularDefinition } from "../internals/types.ts";
import TypesInfo from "../internals/types-info.ts";

const defaultModularDefinition = { imports: [], providers: [], exports: [] };

export default function Module(
  definition: Partial<ModularDefinition> = {},
): ClassDecorator {
  return (target: Target) => {
    TypesInfo.set(target, { ...defaultModularDefinition, ...definition });
  };
}
