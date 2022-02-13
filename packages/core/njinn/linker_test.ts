import "xpr/reflect";
import type { Func, ModuleRef, Target } from "./types.ts";
import linker from "./linker.ts";
import { isCallable, str } from "packages/common/utils/mod.ts";
import { assert, assertThrows } from "packages/testing/mod.ts";
import { AllModules, BadExportModule, ModuleTest } from "packages/testing/nginn_testing.ts";
import Host from "./host.ts";

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
  assert(link(ModuleTest) instanceof Host);
});

Deno.test("should fail for bad export", () => {
  const [link] = setup();
  assertThrows(() => link(BadExportModule));
});

AllModules.forEach((m) =>
  Deno.test(`module ${str(m)} should be registered`, () => {
    const [link, registry] = setup();
    link(ModuleTest);
    assert(registry.has(m));
  })
);
