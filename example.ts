import "core/reflection/mod.ts";
import Context from "common/context/mod.ts";
import { Inject, Injectable, Module } from "core/mod.ts";

@Injectable()
class SizeService {
  constructor(@Inject("size") public i: number) {
  }
}

const SizeToken = { token: "size", factory: () => 10 };

@Module({
  providers: [
    SizeToken,
    SizeService,
  ],
  exports: [SizeToken, SizeService],
})
class SizeModule {
}

const ConfiguredSizeToken = { token: "size", factory: () => 20 };

@Module({
  imports: [SizeModule],
  providers: [ConfiguredSizeToken],
  exports: [SizeModule],
})
class ConfiguredServiceModule {
}

@Module({
  imports: [ConfiguredServiceModule],
})
class App {
}

const app = await Context.create(App, { strict: true });
const service = await app.mod.resolve<SizeService>(SizeService);
console.log(service);
