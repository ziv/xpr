import { assert } from "../../testing/mod.ts";
import isCallable from "./is-callable.ts";

function foo() {
}

type List = unknown[];
const valid: List = [foo, () => false, Date, console.log];
const invalid: List = ["string", 12, {}, true, null];

valid.forEach((callable) => Deno.test("should pass", () => assert(isCallable(callable))));

invalid.forEach((callable) => Deno.test("should fail", () => assert(!isCallable(callable))));
