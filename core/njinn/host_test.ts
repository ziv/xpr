import "xpr/reflect";
import type { Func, ModuleRef, Target } from "./types.ts";
import linker from "./linker.ts";
import { str } from "xpr/common/utils/mod.ts";
import { assert, assertThrows } from "xpr/testing/mod.ts";
import { AllModules, BadExportModule, ModuleTest } from "xpr/testing/nginn_testing.ts";
import { isCallable } from "./utils.ts";
import Host from "./host.ts";

const setup = (): Host => {
  const registry = new WeakMap<Target, ModuleRef>();
  const link = linker({ registry });
  return link(ModuleTest);
};

Deno.test("should select module", () => {
  const host = setup();
  assert(host);
});
