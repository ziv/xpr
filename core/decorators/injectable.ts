import type { Target } from "../internals/types.ts";

export default function Injectable(): ClassDecorator {
  return (_: Target) => {
  };
}
