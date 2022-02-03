import type { Func, Resolver, Target, Token } from "./types.ts";
import getCtrParams from "../metadata/get-ctr-params.ts";
import getInjectedParams from "../metadata/get-injected-params.ts";

const dependencies = (target: Target) => {
  const deps: Token[] = getCtrParams(target);
  console.log("deps", deps);
  const params = getInjectedParams(target);
  console.log("params", params);
  for (const { index, value } of params) {
    deps[index] = value;
  }
  return deps;
};

export default function resolver(target: Target) {
  const deps = dependencies(target);
  return async (ctx: Resolver) => {
    return Reflect.construct(
      target as Func,
      await Promise.all(deps.map((type) => ctx.resolve(type))),
    );
  };
}
