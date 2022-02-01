import type { ModularDefinition, Target } from "core/internals/mod.ts";
import { TypesInfo } from "core/internals/mod.ts";

const defaultModularDefinition = { imports: [], providers: [], exports: [] };

export default function Module(
  definition: Partial<ModularDefinition> = {}
): ClassDecorator {
  return (target: Target) => {
    TypesInfo.set(target, { ...defaultModularDefinition, ...definition });
  };
}
