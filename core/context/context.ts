import type { Linkage, ModuleDescriptor, ModuleHost, Target } from "core/types/mod.ts";
import { compiler, linker } from "core/internals/mod.ts";

export default async function context(module: Target): Promise<[ModuleHost, Linkage]> {
  const register = linker();
  const registry = await register(module);
  const compile = compiler(registry, { strict: true });

  return [
    await compile(registry.get(module) as ModuleDescriptor),
    registry
  ];
}
