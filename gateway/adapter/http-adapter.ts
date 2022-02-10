import { Adapter, AdapterOptions } from "./adapter.ts";

export abstract class HttpAdapter<App, Router> implements Adapter<App, Router> {
  abstract init(options?: AdapterOptions): void | Promise<void>;

  abstract use(): void;

  abstract controller(ctrl: unknown, methods: unknown[]): void;
}
