import "core/reflection/reflection.ts";
import { assertEquals } from "core/testing/mod.ts";
import { Injectable } from "common/decorators/mod.ts";
import getInjectable from "./get_injectable.ts";
import { DefaultScope, ModuleScope, NoScope } from "./consts.ts";

Deno.test("should fetch default scope", () => {
  @Injectable()
  class Foo {
  }

  assertEquals(getInjectable(Foo), { scope: DefaultScope });
});

Deno.test("should fetch module scope", () => {
  @Injectable({ scope: ModuleScope })
  class Foo {
  }

  assertEquals(getInjectable(Foo), { scope: ModuleScope });
});

Deno.test("should fetch no scope", () => {
  @Injectable({ scope: NoScope })
  class Foo {
  }

  assertEquals(getInjectable(Foo), { scope: NoScope });
});
