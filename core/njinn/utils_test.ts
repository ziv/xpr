import { assert } from "../testing/mod.ts";
import { isCallable } from "./utils.ts";

function foo() {
}

type List = unknown[];
const valid: List = [foo, () => false, Date];
const invalid: List = ["string", 12, {}, true, null];

valid.forEach((callable) => Deno.test("should pass", () => assert(isCallable(callable))));

invalid.forEach((callable) => Deno.test("should fail", () => assert(!isCallable(callable))));
