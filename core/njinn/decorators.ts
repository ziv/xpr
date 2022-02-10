import { InjectableDescriptor, ModuleDescriptor, Target, Token } from "./types.ts";
import { addParam, setInjectable, setModuleMetadata } from "./metadata.ts";

export function Injectable(desc: Partial<InjectableDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setInjectable(target, desc.scope);
  };
}

export function Inject(token?: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, parameterIndex: number) => {
    addParam(target, parameterIndex, token ?? target);
  };
}

export function Module(desc: Partial<ModuleDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    setModuleMetadata(target, desc);
  };
}
