import type { Target } from "core/reflection/mod.ts";
import TypesInfo from "core/internals/types-info.ts";

export default function Injectable(): ClassDecorator {
  return (target: Target) => {
    TypesInfo.merge(target, {
      deps: Reflect.getMetadata("design:paramtypes", target) ?? [],
    });
  };
}
