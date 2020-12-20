import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from "./question/question.component";

const routes: Routes = [
  { path: 'quiz', component: QuestionComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
