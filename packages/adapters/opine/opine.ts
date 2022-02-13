import type { Opine } from "./deps.ts";
import { HttpAdapter } from "packages/gateway/mod.ts";
import { opine, Router } from "./deps.ts";

type TRoute = typeof Router;

export default class OpineAdapter extends HttpAdapter<Opine, TRoute> {
  private instance?: Opine;

  init() {
    this.instance = opine();
  }

  use(): void {
  }

  controller(ctrl: unknown, methods: unknown[]) {
    console.log(ctrl, methods);
  }
}
