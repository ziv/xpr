import "core/reflection/reflection.ts";
import { assertEquals } from "core/testing/mod.ts";
import { Injectable } from "common/decorators/mod.ts";
import addParam from "./add_param.ts";
import { PARAMS_DEFINITION } from "./consts.ts";

Deno.test("should add param to target", () => {
  @Injectable()
  class Foo {
  }

  const param = { index: 0, value: "test" };
  addParam(Foo, param);
  assertEquals(Reflect.getMetadata(PARAMS_DEFINITION, Foo), [param]);
});

Deno.test("should add params to target", () => {
  @Injectable()
  class Foo {
  }

  const p0 = { index: 0, value: "test0" };
  const p1 = { index: 1, value: "test1" };
  addParam(Foo, p0);
  addParam(Foo, p1);
  assertEquals(Reflect.getMetadata(PARAMS_DEFINITION, Foo), [p0, p1]);
});
