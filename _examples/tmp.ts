import "jinn/reflect";
import linker, { linkerRegistry } from "xpr/core/njinn/linker.ts";
import { AppModule } from "./shared/app-module.ts";
// import gatewayFactory from "../gateway/factory.ts";
// import OpineAdapter from "../adapters/opine/opine.ts";

const registry = linkerRegistry();
const link = linker({ registry });
const host = link(AppModule);
console.log(host);
// await gatewayFactory({ registry, host, adapter: new OpineAdapter() });
