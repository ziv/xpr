import type { Provider } from "common/types/mod.ts";
import Module from "core/injection/decorators/module.ts";

const p: Provider = {
  token: "size",
  useValue: 10
};

@Module({
  providers: [p],
  exports: [p]
})
export class Feature {
}
