import "xpr/core/mod.ts";
import type { Target } from "../core/mod.ts";
import type { ModuleRef, NjinnContext } from "../core/njinn/types.ts";
import linker from "../core/njinn/linker.ts";
import { AppModule } from "./shared/app-module.ts";
import pipe from "../core/njinn/pipe.ts";

const registry = new WeakMap<Target, ModuleRef>();
const ctx = { registry };
const compiler = pipe<NjinnContext>(linker(ctx));
const app = await compiler(AppModule);
console.log(app);
console.log(app.registry.get(AppModule));
