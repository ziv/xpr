import "xpr/packages/core/mod.ts";
import { GatewayContext } from "packages/gateway/mod.ts";
import HttpModule from "./app/http-module.ts";
import OpineAdapter from "../adapters/opine/opine.ts";

await GatewayContext.from({ module: HttpModule, adapter: new OpineAdapter() });
