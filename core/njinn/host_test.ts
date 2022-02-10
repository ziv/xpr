import "xpr/reflect";
import { Func, ModuleRef, Target } from "./types.ts";
import linker, { LinkerRegistry } from "./linker.ts";
import Host from "./host.ts";
import { BadExportModule, ModuleTest } from "xpr/testing/nginn_testing.ts";
import { assert, assertThrows } from "../../testing/mod.ts";

Deno.test("should create host", () => {
  const registry = new WeakMap<Target, ModuleRef>();
  const link = linker({ registry });
  assert(link(ModuleTest));
});

Deno.test("should fail for bad export", () => {
  const registry = new WeakMap<Target, ModuleRef>();
  const link = linker({ registry });
  assertThrows(() => link(BadExportModule));
});
