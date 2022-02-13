import "jinn/reflect";
import { assert, assertEquals } from "jinn/testing/mod.ts";
import ProviderRegistry from "./registry.ts";
import { Scopes } from "./metadata.ts";
import { Injectable } from "./decorators.ts";

@Injectable()
class Test {
}

const setup = () => new ProviderRegistry(Test);

Deno.test("create registry", () => {
  assert(setup());
});

Deno.test("register by token", () => {
  const provider = { token: Test, scope: Scopes.Default, useType: Test };
  const registry = setup();
  registry.register(Test);

  assert(registry.exists(Test));
  assert(registry.exists(provider));
  assertEquals(registry.fetch(Test), provider);
});

Deno.test("register by provider", () => {
  const provider = { token: Test, scope: Scopes.Module, useValue: true };
  const registry = setup();
  registry.register(provider);

  assert(registry.exists(Test));
  assert(registry.exists(provider));
  assertEquals(registry.fetch(Test), provider);
});
