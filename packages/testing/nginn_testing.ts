import { Injectable, Module } from "../core/njinn/decorators.ts";

@Injectable()
export class ServiceA {
}

@Module({
  providers: [ServiceA],
  exports: [ServiceA],
})
export class ModuleAA {
}

@Module()
export class ModuleAB {
}

@Module({
  imports: [ModuleAA, ModuleAB],
  exports: [ModuleAA],
})
export class ModuleA {
}

@Module()
export class ModuleB {
}

@Module()
export class ModuleC {
}

@Module({
  imports: [ModuleA, ModuleB, ModuleC],
  exports: [ModuleAA],
})
export class ModuleTest {
}

@Module({
  imports: [ModuleA],
  exports: [ModuleB],
})
export class BadExportModule {
}

export const AllModules = [ModuleAA, ModuleAB, ModuleA, ModuleC, ModuleB, ModuleTest];
