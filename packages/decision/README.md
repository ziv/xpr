# decision

## Decision Tree Explained

The decision tree is a nested list of branches (questions) and leafs (decisions).

Branches node have children, which are either branches or leafs.

Leaf nodes have a value, which is the result of the decision.

### Leaf Nodes

The item can be any type of data depends on the implementation.

```typescript
export interface DecisionItem<T> {
  id: string;
  item: T;
}
```
