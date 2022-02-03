import type { EmitterMessage } from "../emitter/mod.ts";

export default function message(context: unknown[]) {
  return (action: string, payload?: unknown): EmitterMessage => ({
    context,
    action,
    payload,
  });
}
