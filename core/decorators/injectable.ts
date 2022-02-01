import TypesInfo from "../internals/types-info.ts";
import type { Target } from "../internals/reflection.ts";

export default function Injectable(): ClassDecorator {
  return (target: Target) => {
    TypesInfo.merge(target, {
      deps: Reflect.getMetadata("design:paramtypes", target) ?? [],
    });
  };
}
