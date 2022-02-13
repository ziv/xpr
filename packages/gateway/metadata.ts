import type { Target } from "jinn/core/njinn/mod.ts";

export enum GateMeta {
  Controller = "xpr:controller",
  Methods = "xpr:methods",
  Middlewares = "xpr:middlewares",
}

export enum Keys {
  Controller = "xpr:controller",
  Methods = "xpr:methods",
  Middlewares = "xpr:middlewares",
}

export function readGateway(target: Target) {

}

// const DefaultMethodDescriptor: MethodDescriptor = {
//   method: "GET",
//   name: "",
//   path: "",
//   middlewares: []
// };

// const DefaultControllerDescriptor: ControllerDescriptor = {
//   prefix: "",
//   methods: [],
//   middlewares: []
// };
//
// function replace(target: Target, desc: ControllerDescriptor) {
//   def(Keys.Controller, Keys.Controller, desc);
// }
//
// export function getController(target: Target): ControllerDescriptor {
//   return (get(Keys.Controller, target) ?? DefaultControllerDescriptor) as ControllerDescriptor;
// }
//
//
// export function setController(target: Target, desc: Partial<ControllerDescriptor>) {
//   replace(target, { ...getController(target), prefix: desc.prefix ?? "" });
// }
//
// export function addControllerMiddlewares(target: Target, middlewares: Target[]) {
//   const desc = getController(target);
//   replace(target, { ...desc, middlewares: [...desc.middlewares, ...middlewares] });
// }
//
//
// export function setMiddleware(target: Target, desc: { name: string, middlewares: Target[] }) {
//   def(Keys.Middlewares, desc, target);
// }
//
// export function getMiddleware(target: Target) {
//   return get(Keys.Middlewares, target) as { name: string, middlewares: Target[] };
// }
//
// export function addMethod(target: Target, desc: MethodDescriptor) {
//   const ctrl = getController(target);
//   ctrl.methods.push(desc);
//   replace(target, ctrl);
// }
//
// export function addMethodMiddlewares(target: Target, method: string, middlewares: Target[]) {
//   const ctrl = getController(target);
//   console.log('addMethodMiddlewares', ctrl);
// }
//
// export function getMethods(target: Target): MethodDescriptor[] {
//   return get(Keys.Methods, target) ?? [];
// }
