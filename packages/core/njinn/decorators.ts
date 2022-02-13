import {
  InjectableMetaDescriptor,
  InjectedMetaParam,
  ModuleMetaDescriptor,
  Target,
  Token,
  TypeProvider,
} from "./types.ts";
import { define, merge, Meta, Scopes } from "./metadata.ts";

export function Module(desc: Partial<ModuleMetaDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    define<ModuleMetaDescriptor>(Meta.Module, {
      ...{ imports: [], providers: [], exports: [] },
      ...desc,
    }, target);
    define<TypeProvider>(Meta.Injectable, {
      scope: Scopes.Default,
      token: target,
      useType: target,
    }, target);
  };
}

export function Injectable(desc: Partial<InjectableMetaDescriptor> = {}): ClassDecorator {
  return (target: Target) => {
    define<TypeProvider>(Meta.Injectable, {
      scope: desc.scope ?? Scopes.Default,
      token: target,
      useType: target,
    }, target);
  };
}

export function Inject(token: Token): ParameterDecorator {
  return (target: Target, _: string | symbol, index: number) => {
    merge<InjectedMetaParam>(Meta.Params, { value: token, index }, target);
  };
}
