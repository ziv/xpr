import { BehaviorSubject } from "./deps.ts";

export interface EmitterMessage {
  context: unknown[];
  action: string;
  payload?: unknown;
}

export default class Emitter extends BehaviorSubject {
}
