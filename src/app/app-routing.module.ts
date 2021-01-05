import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {UserComponent} from './user/user.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";

const routes: Routes = [
  { path: 'quiz', component: QuestionComponent },
  { path: 'question/update/:id', component: EditQuestionComponent },
  { path: 'question/create', component: EditQuestionComponent },
  { path: 'users', component: UserComponent },
  {path: 'games', component: GameComponent},
  {path: 'game/create', component: AddGameComponent},
  {path: 'game/update/:id', component: AddGameComponent},
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
