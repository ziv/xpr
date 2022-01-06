import { BehaviorSubject, map, Observable, tap } from 'rxjs';

export interface DecisionItem<B, L> {
  id: string;
  item: B | L;
  children?: DecisionItem<B, L>[];
}

export interface State<Leaf, Last> {
  steps: DecisionItem<Leaf, Last>[];
  current: DecisionItem<Leaf, Last>;
}


export class Decision<Question, Decision> {
  private state$: BehaviorSubject<State<Question, Decision>>;
  items$: Observable<DecisionItem<Question, Decision>[]>;

  constructor(private readonly tree: DecisionItem<Question, Decision>) {
    const start: State<Question, Decision> = { steps: [tree], current: tree };
    this.state$ = new BehaviorSubject(start);
    this.items$ = this.state$.asObservable().pipe(
      map(s => s.current?.children ?? [])
    );
  }

  get value() {
    return this.state$.getValue();
  }

  run() {
    return this.items$;
  }

  get first(): boolean {
    return this.value.current.id === this.tree.id;
  }

  back() {
    const steps = this.value.steps;
    steps.pop();
    this.state$.next({ steps, current: steps[steps.length - 1] });
  }

  selectId(id: string) {
    const item = this.state$.getValue().current.children?.find(c => c.id === id);
    this.select(item as any);
  }

  select(item: DecisionItem<Question, Decision>) {
    if (!item.children) {
      console.log('no children for selected item');
      return;
    }
    const v = this.state$.getValue();
    console.log('select', {v, item});
    console.log('have children', item.children?.length);
    this.state$.next({
      // @ts-ignore
      current: item,
      // @ts-ignore
      steps: [...v.steps, item]
    })
  }
}
