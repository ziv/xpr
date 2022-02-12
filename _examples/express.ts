import "xpr/core/mod.ts";
import { GatewayContext } from "xpr/gateway/mod.ts";
import HttpModule from "./shared/http-module.ts";
import OpineAdapter from "../adapters/opine/opine.ts";

await GatewayContext.from({ module: HttpModule, adapter: new OpineAdapter() });
