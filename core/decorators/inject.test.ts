import { assert, assertEquals } from "https://deno.land/std@0.123.0/testing/asserts.ts";
import Inject from "./inject.ts";
import TypesInfo from "../internals/types-info.ts";

Deno.test("should return decorator", () => {
  assert(Inject() instanceof Function);
});

Deno.test("decorator function should update types info", () => {
  const inject = Inject();

  class Test0 {
  }

  inject(Test0, "", 0);
  assertEquals(TypesInfo.get(Test0), { "0": Test0 });
});

Deno.test("decorator function with token should update types info", () => {
  const inject = Inject("token");

  class Test1 {
  }

  inject(Test1, "", 0);
  assertEquals(TypesInfo.get(Test1), { "0": "token" });
});
