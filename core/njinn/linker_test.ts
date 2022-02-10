import "xpr/reflect";
import type { Func, ModuleRef, Target } from "./types.ts";
import type { LinkerRegistry } from "./linker.ts";
import linker from "./linker.ts";
import { str } from "xpr/common/utils/mod.ts";
import { assert, assertThrows } from "xpr/testing/mod.ts";
import { AllModules, BadExportModule, ModuleTest } from "xpr/testing/nginn_testing.ts";
import { isCallable } from "./utils.ts";
import Host from "./host.ts";


let func: Func;
let registry: LinkerRegistry;
let host: Host;

const setup = (): [Func, WeakMap<Target, ModuleRef>] => {
  const registry = new WeakMap<Target, ModuleRef>();
  const link = linker({ registry });
  return [link, registry];
};

Deno.test("should create host", () => {
  const [link] = setup();
  assert(isCallable(link));
});

Deno.test("should return host", () => {
  const [link] = setup();
  host = link(ModuleTest);
  assert(host instanceof Host);
});

Deno.test("should fail for bad export", () => {
  const [link] = setup();
  assertThrows(() => link(BadExportModule));
});

AllModules.forEach(m => Deno.test(`module ${str(m)} should be registered`, () => {
  const [link, registry] = setup();
  host = link(ModuleTest);
  assert(registry.has(m));
}));
