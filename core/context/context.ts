import type { Target } from "../types/reflection.ts";
import type { ModuleDescriptor, ModuleHost } from "../types/module.ts";
import type { Linkage } from "../internals/linker.ts";
import { compiler, linker } from "../internals/mod.ts";

export default async function context(module: Target): Promise<[ModuleHost, Linkage]> {
  const register = linker();
  const registry = await register(module);
  const compile = compiler(registry, { strict: true });

  return [
    await compile(registry.get(module) as ModuleDescriptor),
    registry
  ];
}
