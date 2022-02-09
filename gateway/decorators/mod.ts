import type { Target } from "xpr/core/mod.ts";
import { Scopes, setInjectable } from "xpr/core/mod.ts";
import { addMethod, setController } from "../injection/metadata.ts";

export function Controller(prefix = ""): ClassDecorator {
  return (target: Target) => {
    setController(target, { prefix });
    setInjectable(target, Scopes.Module);
  };
}

export function Get(path = ""): MethodDecorator {
  return (target: Target, propertyKey: string | symbol) => {
    addMethod(target, { method: "GET", name: String(propertyKey), path });
  };
}

export function Post(path = ""): MethodDecorator {
  return (target: Target, propertyKey: string | symbol) => {
    addMethod(target, { method: "POST", name: String(propertyKey), path });
  };
}

export function Put(path = ""): MethodDecorator {
  return (target: Target, propertyKey: string | symbol) => {
    addMethod(target, { method: "PUT", name: String(propertyKey), path });
  };
}

export function Delete(path = ""): MethodDecorator {
  return (target: Target, propertyKey: string | symbol) => {
    addMethod(target, { method: "DELETE", name: String(propertyKey), path });
  };
}
