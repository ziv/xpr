import "./internals/reflection.ts";
import Module from "./decorators/module.ts";
import compiler from "./internals/compiler.ts";
import Injectable from "./decorators/injectable.ts";
import Modular from "./internals/modular.ts";
import Inject from "./decorators/inject.ts";
import { Target } from "./internals/reflection.ts";

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
  exports: [SizeService],
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

const build = compiler(new WeakMap<Target, Modular>(), { strict: false });
const app: Modular = await build(App);
const service = await app.resolve<SizeService>(SizeService);
console.log(service);
