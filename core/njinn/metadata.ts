import type { InjectedParam, ModuleDescriptor, Provider, Target, Token } from "./types.ts";

const def = Reflect.defineMetadata;
const get = Reflect.getMetadata;

export enum Scopes {
  Default = "Default",
  Module = "Module",
  None = "None",
}

export enum Keys {
  Ctr = "design:paramtypes",
  Module = "xpr:modules",
  Params = "xpr:params",
  Injectable = "xpr:injectable",
}

export function setModuleMetadata(target: Target, desc: Partial<ModuleDescriptor>) {
  def(Keys.Module, { ...{ imports: [], providers: [], exports: [] }, ...desc }, target);
}

export function setInjectable(target: Target, scope?: string) {
  def(Keys.Injectable, { scope: scope ?? Scopes.Default, useType: target, token: target }, target);
}

export function addParam(target: Target, index: number, value: Token) {
  def(Keys.Params, [...getParams(target), { index, value }], target);
}

export function getModuleDescriptor(target: Target): ModuleDescriptor {
  return get(Keys.Module, target) as ModuleDescriptor;
}

export function getInjectable(target: Target): Provider {
  return get(Keys.Injectable, target) as Provider;
}

export function getParams(target: Target): InjectedParam[] {
  return get(Keys.Params, target as Target) as InjectedParam[] ?? [];
}

export function getCtr(target: Target): Target[] {
  return get(Keys.Ctr, target as Target) as Target[] ?? [];
}
