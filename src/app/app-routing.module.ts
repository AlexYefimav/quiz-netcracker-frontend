import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {AnswerComponent} from './answer/answer.component';
import {UserComponent} from './user/user.component';

const routes: Routes = [
  { path: 'quiz', component: QuestionComponent },
  { path: 'answers', component: AnswerComponent },
  { path: 'users', component: UserComponent },
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
