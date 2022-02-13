// import "xpr/reflect";
// import { assertEquals } from "xpr/testing/mod.ts";
// import { getCtr, getInjectable, getModuleDescriptor, getParams, Scopes } from "./metadata.ts";
// import { Inject, Injectable, Module } from "./decorators.ts";
//
// Deno.test("should return default module descriptor", () => {
//   const descriptor = { imports: [], providers: [], exports: [] };
//
//   @Module()
//   class ModuleTest {
//   }
//
//   assertEquals(getModuleDescriptor(ModuleTest), descriptor);
// });
//
// Deno.test("should return given module descriptor", () => {
//   const descriptor = { imports: [Date], providers: [Date], exports: [Date] };
//
//   @Module(descriptor)
//   class ModuleTest {
//   }
//
//   assertEquals(getModuleDescriptor(ModuleTest), descriptor);
// });
//
// Deno.test("should return default injectable", () => {
//   @Injectable()
//   class InjectableTest {
//   }
//
//   const expected = { scope: Scopes.Default, token: InjectableTest, useType: InjectableTest };
//   assertEquals(getInjectable(InjectableTest), expected);
// });
//
// Deno.test("should return given injectable", () => {
//   @Injectable({ scope: Scopes.Module })
//   class InjectableTest {
//   }
//
//   const expected = { scope: Scopes.Module, token: InjectableTest, useType: InjectableTest };
//   assertEquals(getInjectable(InjectableTest), expected);
// });
//
// Deno.test("should return ctr params", () => {
//   @Injectable()
//   class InjectableTest {
//     constructor(_n: number, _s: string) {
//     }
//   }
//
//   const expected = [Number, String];
//   assertEquals(getCtr(InjectableTest), expected);
// });
//
// Deno.test("should return empty ctr params", () => {
//   @Injectable()
//   class InjectableTest {
//     constructor() {
//     }
//   }
//
//   assertEquals(getCtr(InjectableTest), []);
// });
//
// Deno.test("should return injected params 0", () => {
//   @Injectable()
//   class InjectableTest {
//     constructor(@Inject("number") _n: number, _s: string) {
//     }
//   }
//
//   const expected = [{ index: 0, value: "number" }];
//   assertEquals(getParams(InjectableTest), expected);
// });
//
// Deno.test("should return injected params 1", () => {
//   @Injectable()
//   class InjectableTest {
//     constructor(_n: number, @Inject("string") _s: string) {
//     }
//   }
//
//   const expected = [{ index: 1, value: "string" }];
//   assertEquals(getParams(InjectableTest), expected);
// });
