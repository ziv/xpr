export default function isCallable(e: unknown): e is Function {
  return typeof e === "function";
}
