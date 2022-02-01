import type { Target } from "../reflection/mod.ts";
import { TypesInfo } from "../internals/mod.ts";

export default function Injectable(): ClassDecorator {
  return (target: Target) => {
    TypesInfo.merge(target, {
      deps: Reflect.getMetadata("design:paramtypes", target) ?? []
    });
  };
}
