export type AdapterOptions = unknown;

export interface Adapter<App, Router> {
  init(options?: AdapterOptions): void | Promise<void>;

  use(): void;

  controller(ctrl: unknown, methods: unknown[]): void;
}
