import { Item, State, Tree } from './interfaces';
import { BehaviorSubject, map, Observable } from 'rxjs';

export class Decide<Step = any, Decision = any> {
  private state: State<Step, Decision>;
  readonly state$: BehaviorSubject<State<Step, Decision>>;

  get items$(): Observable<Item<Step, Decision>[]> {
    return this.state$.asObservable().pipe(map(state => state.current?.children ?? []));
  }

  get first$(): Observable<boolean> {
    return this.state$.asObservable().pipe(map(state => state.first));
  }

  get last$(): Observable<boolean> {
    return this.state$.asObservable().pipe(map(state => state.last));
  }

  constructor(public readonly tree: Tree<Step, Decision>) {
    this.state = { current: tree, steps: [tree], first: true, last: false };
    this.state$ = new BehaviorSubject(this.state);
  }

  next(item?: Item<Step, Decision>) {
    if (!item || !item.children) {
      return;
    }
    this.state = {
      current: item,
      steps: [...this.state.steps, item],
      first: false,
      last: !!item.children
    };
    this.state$.next(this.state);
  }

  back() {
    if (1 === this.state.steps.length) {
      return;
    }
    const steps = this.state.steps.slice(0, -1);
    this.state = {
      steps: steps,
      current: steps[steps.length - 1],
      first: steps.length === 1,
      last: false
    };
    this.state$.next(this.state);
  }
}
