export interface Item<Branch, Leaf> {
  id: string;
  item: Branch | Leaf;
  children?: Item<Branch, Leaf>[];
}

export interface Tree<Branch, Leaf> extends Item<Branch, Leaf> {
  children: Item<Branch, Leaf>[];
}

export interface State<Branch, Leaf> {
  current: Item<Branch, Leaf>;
  steps: Item<Branch, Leaf>[];
  first: boolean;
  last: boolean;
}
