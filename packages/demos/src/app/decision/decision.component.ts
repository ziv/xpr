import { Component, OnInit } from '@angular/core';
import { getTreeData } from './data';
import { Decision } from '@xpr/decision';
import { Observable } from 'rxjs';

@Component({
  selector: 'xpr-decision',
  templateUrl: './decision.component.html',
  styleUrls: ['./decision.component.scss']
})
export class DecisionComponent implements OnInit {
  tree?: Decision<string, string>;
  items$?: Observable<any[]>;

  ngOnInit(): void {
    this.tree = new Decision<string, string>(getTreeData());
    this.items$ = this.tree.run();
  }

}
