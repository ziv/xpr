import type { Provider } from "xpr/core/mod.ts";
import { Module } from "xpr/core/mod.ts";

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
