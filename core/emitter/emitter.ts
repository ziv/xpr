import type { Target } from "core/types/mod.ts";
import { BehaviorSubject } from "./deps.ts";

export type EmitterMessage = { context: string | symbol | Target; payload?: unknown };

export default class Emitter extends BehaviorSubject<string> {
}
