import type { LinkerDescriptor, LinkerFactory, LinkerOptions, ModuleRef, Target } from "xpr/core/mod.ts";
import { getModuleDescriptor } from "xpr/core/mod.ts";
import type { Adapter } from "../adapter/adapter.ts";
import { noop, str } from "../../common/utils/mod.ts";
import { blue, green } from "../../common/deps/mod.ts";
import Gateway from "./gateway.ts";
import { getMethods } from "./metadata.ts";
import { MethodDescriptor } from "./types.ts";

function createMethod(controller: any, method: MethodDescriptor, host: Gateway) {
  const f = controller[method.name].bind(controller);
  console.log("meth");
}

export default async function gatewayFactory<App, Router>(adapter: Adapter<App, Router>): Promise<LinkerFactory> {
  // init adapter
  await adapter.init();
  // factory function that build each module controllers
  return async function (desc: LinkerDescriptor, options: LinkerOptions): Promise<ModuleRef> {
    const { target, imported, provided, exported } = desc;
    console.log(blue("linker"), green(str(target)), options);

    const controllers = (getModuleDescriptor(target)?.controllers ?? []) as Target[];

    // register controllers as providers
    console.log("register controllers as providers");
    controllers.forEach(provided.register.bind(provided));

    // build the gateway
    console.log("creating the host (gateway)");
    const gateway = new Gateway(target, imported, provided, exported, noop);

    // lets create controller!!
    for (const ctrl of controllers) {
      console.log(" - creating controller", ctrl);
      const instance: any = await gateway.resolve(ctrl);
      console.log(" - controller created", instance);

      // fetch methods
      const methods = getMethods(ctrl);
      console.log(" - controller methods", methods);

      for (const method of methods) {
        // build route
        createMethod(instance, method, gateway);
      }
    }

    return gateway;
  };
}
