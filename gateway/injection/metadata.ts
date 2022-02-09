import type { Target } from "xpr/core/mod.ts";
import type { ControllerDescriptor, MethodDescriptor } from "./types.ts";

const def = Reflect.defineMetadata;
const get = Reflect.getMetadata;

export enum Keys {
  Controller = "xpr:controller",
  Methods = "xpr:methods",
}

export function setController(target: Target, desc: Partial<ControllerDescriptor>) {
  def(Keys.Controller, { prefix: "", ...desc }, target.constructor);
}

export function getController(target: Target): ControllerDescriptor {
  return get(Keys.Controller, target.constructor) as ControllerDescriptor;
}

export function addMethod(target: Target, desc: MethodDescriptor) {
  def(Keys.Methods, [...getMethods(target.constructor), desc], target.constructor);
}

export function getMethods(target: Target): MethodDescriptor[] {
  return get(Keys.Methods, target) ?? [];
}
