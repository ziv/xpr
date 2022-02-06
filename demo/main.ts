import "core/reflection/reflection.ts";
import { context } from "common/context/mod.ts";
import { App } from "./app.ts";
import { Emitter } from "core/emitter/mod.ts";

const emitter = new Emitter();
emitter.subscribe(e => console.log(e));
const [ctx, registry] = await context(App, { emitter });
