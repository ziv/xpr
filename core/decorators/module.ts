import type { ModularDefinition, Target } from "../internals/mod.ts";
import setModuleDefinition from "../metadata/set-module-definition.ts";

export default function Module(
  definition: Partial<ModularDefinition> = {},
): ClassDecorator {
  return (target: Target) => {
    setModuleDefinition(target, definition);
  };
}
