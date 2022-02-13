export type EventType = string | string[];

const toArray = (type: EventType) => Array.isArray(type) ? type : [type];

export default class Emitter extends EventTarget {
  emit(event: string, detail?: unknown) {
    return this.dispatchEvent(new CustomEvent(event, { detail }));
  }

  on(event: EventType, cb: EventListener) {
    toArray(event).forEach((e) => this.addEventListener(e, cb));
  }

  once(event: EventType, cb: EventListener) {
    toArray(event).forEach((e) => this.addEventListener(e, cb, { once: true }));
  }

  off(event: EventType, cb: EventListener) {
    toArray(event).forEach((e) => this.removeEventListener(e, cb));
  }
}
