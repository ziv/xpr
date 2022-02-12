import type { ModuleRef } from "../njinn/types.ts";

export default function* moduleRef(host: ModuleRef): Generator<ModuleRef> {
  yield host;
  for (const i of host.imports) {
    yield* moduleRef(i);
  }
}
