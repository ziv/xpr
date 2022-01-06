import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DecisionComponent, DecisionModule } from './decision';
import { HomeModule } from './home/home.module';
import { HomeComponent } from './home/home.component';

@NgModule({
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    HomeModule,
    DecisionModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'decision', component: DecisionComponent }
    ])
  ]
})
export class AppModule {
}
