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

export function merge<T = unknown>(key: Meta, value: T, target: Target) {
  const list = [...read(key, target, []), value];
  define(key, list, target);
}

export function define<T = unknown, K extends string = Meta>(key: K, value: T, target: Target) {
  Reflect.defineMetadata(key as string, value, target);
}

export function read<T = unknown>(key: Meta, target: Target, defaultValue?: T): T {
  return (Reflect.getMetadata(key, target) ?? defaultValue) as T;
}

