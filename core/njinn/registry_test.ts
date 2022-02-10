import "xpr/reflect";
import Registry from "./registry.ts";
import { assert, assertEquals } from "../../testing/mod.ts";
import { Scopes } from "./metadata.ts";
import Injectable from "../decorators/injectable.ts";

@Injectable()
class Test {
}

const setup = () => new Registry(Test);

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
