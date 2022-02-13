import type { Target } from "./types.ts";

export enum Scopes {
  Default = "Default",
  Module = "Module",
  None = "None",
}

export enum Meta {
  Ctr = "design:paramtypes",
  Module = "xpr:modules",
  Params = "xpr:params",
  Injectable = "xpr:injectable",
}

export type Key = Meta | string;

export function merge<T = unknown>(key: Key, value: T, target: Target) {
  const list = [...read<T[]>(key, target, []), value];
  define<T[]>(key, list, target);
}

export function define<T = unknown>(key: Key, value: T, target: Target) {
  Reflect.defineMetadata(key as string, value, target);
}

export function read<T = unknown>(key: Key, target: Target, defaultValue?: T): T {
  return (Reflect.getMetadata(key, target) ?? defaultValue) as T;
}
