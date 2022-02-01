import type { ModularDefinition, Target } from "core/internals/types.ts";
import TypesInfo from "core/internals/types-info.ts";

const defaultModularDefinition = { imports: [], providers: [], exports: [] };

export default function Module(
  definition: Partial<ModularDefinition> = {},
): ClassDecorator {
  return (target: Target) => {
    TypesInfo.set(target, { ...defaultModularDefinition, ...definition });
  };
}
