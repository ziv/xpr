type Named = { name: string };
type ToString = { toString: () => string };

export default function str(item: unknown): string {
  if (!item) {
    return "undefined";
  }

  if (typeof item === "string") {
    return item;
  }

  if ((item as Named).name) {
    return (item as Named).name;
  }

  if ((item as ToString).toString) {
    return (item as ToString).toString();
  }

  return String(item);
}
