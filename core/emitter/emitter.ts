import type { Func, Target } from "core/types/mod.ts";
import { Subject, filter } from "./deps.ts";

export type EmitterType = string | symbol;
export type EmitterEvent = { event: EmitterType };
export type EmitterData = { context?: string | Target; payload?: unknown };
export type EmitterMessage = EmitterEvent & EmitterData;

export default class Emitter extends Subject<EmitterMessage> {
  // todo not completed, got to go :)

  emit(event: EmitterType, rest?: EmitterData) {
    this.next({ event, ...rest ?? {} });
  }

  on(event: EmitterType, next: Func) {
    this.pipe(filter(e => e.event === event)).subscribe({
      next(e) {
        next(e);
      }
    });
  }
}
