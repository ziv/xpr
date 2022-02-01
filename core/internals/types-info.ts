import type { Obj, Target } from "./types.ts";

export default class TypesInfo {
  private static types = new WeakMap();

  static set(type: Target, info: Obj) {
    TypesInfo.types.set(type, info);
  }

  static get<T = unknown>(type: Target): T {
    return TypesInfo.types.get(type) as T;
  }

  static has(type: Target): boolean {
    return TypesInfo.types.has(type);
  }

  static merge(type: Target, info: Obj) {
    TypesInfo.types.set(type, {
      ...(TypesInfo.types.get(type) ?? {}),
      ...info,
    });
  }
}
