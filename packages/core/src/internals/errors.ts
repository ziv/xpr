import { Target, Token } from "./types.ts";

export class TokenNotFound extends Error {
  constructor(token: Token, module: string) {
    super(`token "${String(token)}" not found in module "${module}"`);
  }
}

export class FactoryError extends Error {
  constructor(token: Token, e: Error) {
    super(`token "${String(token)} factory failed. ${e}`);
  }
}

export class ResolverError extends Error {
  constructor(target: Target) {
    super(`${String(target)} is not injectable`);
  }
}
