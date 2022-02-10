import "xpr/reflect";
import { assertEquals } from "xpr/testing/mod.ts";
import { ModuleAA, ModuleTest, ServiceA } from "xpr/testing/nginn_testing.ts";
import { getInjectable, getModuleDescriptor, Scopes } from "./metadata.ts";

Deno.test("Module, should set module descriptor", () => {
  assertEquals(getModuleDescriptor(ModuleTest).exports, [ModuleAA]);
});

Deno.test("Injectable, should set injectable descriptor", () => {
  assertEquals(getInjectable(ServiceA).scope, Scopes.Default);
});

// add test for Inject
