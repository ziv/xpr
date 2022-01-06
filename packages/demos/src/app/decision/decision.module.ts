import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionComponent } from './decision.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    DecisionComponent
  ],
  exports: [
    DecisionComponent
  ]
})
export class DecisionModule {
}
