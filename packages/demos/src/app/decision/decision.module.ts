import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DecisionComponent } from './decision.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    RouterModule
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
