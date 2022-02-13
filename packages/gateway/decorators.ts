import type { InjectableMetaDescriptor, Target } from "jinn/core/njinn/mod.ts";
import { define, Meta, Scopes, Injectable, Inject } from "jinn/core/njinn/mod.ts";
import { ControllerMeta, GatewayMetaDescriptor } from "./types.ts";
import { GateMeta } from "./metadata.ts";
import { TypeProvider } from "../core/njinn/types.ts";

export { Inject, Injectable };

export function Module(desc: GatewayMetaDescriptor = {}): ClassDecorator {
  return (target: Target) => {
    define<GatewayMetaDescriptor>(Meta.Module, {
      ...{ imports: [], providers: [], exports: [], controllers: [] },
      ...desc
    }, target);
    define<TypeProvider>(Meta.Injectable, {
      scope: Scopes.Default,
      token: target,
      useType: target
    }, target);
  };
}

export function Controller(prefix = ""): ClassDecorator {
  return (target: Target) => {
    define<ControllerMeta>(GateMeta.Controller, { prefix }, target);
    define<InjectableMetaDescriptor>(Meta.Injectable, { scope: Scopes.Module }, target);
  };
}

export function Middleware(...middlewares: Target[]): ClassDecorator & MethodDecorator {
  return (target: Target, propertyKey?: string | symbol) => {
    // console.log('** middleware');
    // addMethodMiddlewares(target, String(propertyKey), middlewares);
  };
}

export function Get(path = ""): MethodDecorator {
  return (target: Target, propertyKey: string | symbol) => {
    console.log("** get");
    // addMethod(target, { method: "GET", name: String(propertyKey), path, middlewares: [] });
  };
}

//
// export function Post(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "POST", name: String(propertyKey), path });
//   };
// }
//
// export function Put(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "PUT", name: String(propertyKey), path });
//   };
// }
//
// export function Delete(path = ""): MethodDecorator {
//   return (target: Target, propertyKey: string | symbol) => {
//     addMethod(target, { method: "DELETE", name: String(propertyKey), path });
//   };
// }
