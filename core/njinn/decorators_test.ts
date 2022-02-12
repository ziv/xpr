import "jinn/reflect";
import type { InjectedMetaParam, ModuleMetaDescriptor, TypeProvider } from "./types.ts";
import { assertEquals } from "jinn/testing/mod.ts";
import { Meta, read, Scopes } from "./metadata.ts";
import { Inject, Injectable, Module } from "./decorators.ts";

Deno.test("should set default module meta descriptor", () => {
  @Module()
  class TestModule {
  }

  assertEquals(read<ModuleMetaDescriptor>(Meta.Module, TestModule), {
    imports: [],
    exports: [],
    providers: [],
  });
  assertEquals(read<TypeProvider>(Meta.Injectable, TestModule), {
    scope: Scopes.Default,
    token: TestModule,
    useType: TestModule,
  });
});

Deno.test("should set module meta descriptor", () => {
  const desc = { imports: [Date], exports: [Date], providers: [Date] };

  @Module(desc)
  class TestModule {
  }

  assertEquals(read<ModuleMetaDescriptor>(Meta.Module, TestModule), desc);
  assertEquals(read<TypeProvider>(Meta.Injectable, TestModule), {
    scope: Scopes.Default,
    token: TestModule,
    useType: TestModule,
  });
});

Deno.test("should set default injectable meta descriptor", () => {
  @Injectable()
  class TestInject {
  }

  assertEquals(read<TypeProvider>(Meta.Injectable, TestInject), {
    scope: Scopes.Default,
    token: TestInject,
    useType: TestInject,
  });
});

Deno.test("should set injectable meta descriptor", () => {
  @Injectable({ scope: Scopes.None })
  class TestInject {
  }

  assertEquals(read<TypeProvider>(Meta.Injectable, TestInject), {
    scope: Scopes.None,
    token: TestInject,
    useType: TestInject,
  });
});

Deno.test("should set default injected param descriptor", () => {
  @Injectable()
  class TestParam {
    constructor(@Inject("test") _v: number) {
    }
  }

  assertEquals(read<InjectedMetaParam[]>(Meta.Params, TestParam), [{ value: "test", index: 0 }]);
});
