import { assert } from "https://deno.land/std@0.123.0/testing/asserts.ts";
import Injectable from "./injectable.ts";

Deno.test("should return decorator", () => {
  assert(Injectable() instanceof Function);
});
