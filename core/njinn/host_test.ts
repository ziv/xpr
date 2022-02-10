import "xpr/reflect";
import type { ModuleRef, Target } from "./types.ts";
import linker from "./linker.ts";
import { assert } from "xpr/testing/mod.ts";
import { ModuleTest } from "xpr/testing/nginn_testing.ts";
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
