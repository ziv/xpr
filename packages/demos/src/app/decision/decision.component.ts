import { Component, OnInit } from '@angular/core';
import { Decide } from '@xpr/decide';
import { getTreeData, MyAnswer, MyStep } from './data';
import { Router } from '@angular/router';
import { tap } from 'rxjs';

@Component({
  selector: 'xpr-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {
  service?: Decide<MyStep, MyAnswer>;

  constructor(public readonly router: Router) {
  }
  ngOnInit(): void {
    this.service = new Decide<MyStep, MyAnswer>(getTreeData());
    this.service.state$.asObservable().pipe(
      tap(state => console.log(state)),
      tap(state => this.router.navigate([], {fragment: state.current.id}))
    ).subscribe();
    // this.router.navigate([], {fragment: ''})
  }

}
