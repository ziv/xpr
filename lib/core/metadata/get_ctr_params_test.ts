import "core/reflection/reflection.ts";
import { assertEquals } from "core/testing/mod.ts";
import { Injectable } from "common/decorators/mod.ts";
import { getCtrParams } from "./mod.ts";

Deno.test("should fetch empty constructor params", () => {
  @Injectable()
  class Foo {
  }

  assertEquals(getCtrParams(Foo), []);
});

Deno.test("should fetch constructor params", () => {
  @Injectable()
  class Foo {
    constructor(_n: number, _s: string) {
    }
  }

  const params = getCtrParams(Foo);
  assertEquals(2, params.length);

  const [n, s] = params;
  assertEquals(typeof n, "function");
  assertEquals((n as { name: string }).name, "Number");


  assertEquals(typeof s, "function");
  assertEquals((s as { name: string }).name, "String");
});
