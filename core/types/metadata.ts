import type { Target } from "./reflection.ts";

export { Target };
export type Token = Target | symbol | string;
export type InjectedParam = { index: number; value: Token };
// resolving
