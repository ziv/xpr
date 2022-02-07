import "core/reflection/reflection.ts";
import { Inject, Injectable } from "common/decorators/mod.ts";
import getInjectedParams from "./get_injected_params.ts";
import { assertEquals } from "core/testing/mod.ts";

Deno.test("should return no params", () => {
  @Injectable()
  class Foo {
  }

  assertEquals([], getInjectedParams(Foo));
});

Deno.test("should return injected param", () => {
  @Injectable()
  class Foo {
    constructor(@Inject("test") _n: number) {
    }
  }

  const params = getInjectedParams(Foo);
  assertEquals(1, params.length);
  assertEquals({ index: 0, value: "test" }, params[0]);
});

Deno.test("should return injected params", () => {
  @Injectable()
  class Foo {
    constructor(@Inject("bar") _n: number,
                @Inject("foo") _s: string) {
    }
  }

  const params = getInjectedParams(Foo);
  assertEquals(2, params.length);
  assertEquals({ index: 1, value: "foo" }, params[0]);
  assertEquals({ index: 0, value: "bar" }, params[1]);
});
