import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {UserComponent} from './user/user.component';
import {EditUserComponent} from "./edit-user/edit-user.component";

const routes: Routes = [
  { path: 'quiz', component: QuestionComponent },
  { path: 'question/update/:id', component: EditQuestionComponent },
  { path: 'question/create', component: EditQuestionComponent },
  { path: 'users', component: UserComponent },
  { path: 'users', component: UserComponent },
  { path: 'users/update/:id', component: EditUserComponent },
  { path: 'users/create', component: EditUserComponent },
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
