import type { LinkerRegistry, ModuleRef } from "jinn/core/njinn/mod.ts";
import moduleRef from "jinn/core/it/module-ref.ts";

export interface GatewayFactoryOptions {
  host: ModuleRef;
  registry: LinkerRegistry;
}

export interface ControllerDescriptor {
  prefix: string;
  methods: any[];
}

export default async function gatewayFactory({ host }: GatewayFactoryOptions) {
  // let's start with collecting gateway data (controllers)
  const controllers: any[] = [];
  for (const h of moduleRef(host)) {
    // const controllers = (getModuleDescriptor(h.ref).controllers ?? []) as Target[];
    // for each controller, read its metadata
    for (const c of controllers) {
      // register the controller as provider
      h.provides.register(c);
      const resolveController = () => h.resolve(c);

      // fetch controller details
      // const controller = getController(c);
      // const methods = getMethods(c);
      // const DT = "design:type";
      // const DPT = "design:paramtypes";
      // const DRT = "design:returntype";
      // console.log(Reflect.getMetadata(DT, (c as Function).prototype, 'sayHello'));
      // data.push(controller);
    }
  }

  console.log(data);
}
