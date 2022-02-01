import type { Target } from "core/reflection/mod.ts";
import { TypesInfo } from "core/internals/mod.ts";

export default function Injectable(): ClassDecorator {
  return (target: Target) => {
    TypesInfo.merge(target, {
      deps: Reflect.getMetadata("design:paramtypes", target) ?? []
    });
  };
}
