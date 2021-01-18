import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {QuestionComponent} from "./question/question.component";
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {UserComponent} from './user/user.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {SignInComponent} from "./sign-in/sign-in.component";
// import {RegisterComponent} from "./register/register.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {QuestionResolverService} from "./service/resolver/question-resolver.service";
import {GameplayComponent} from "./gameplay/gameplay.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {GameplayResolverService} from "./service/resolver/gameplay-resolver.service";

const routes: Routes = [
  // {path: 'quiz', component: QuestionComponent, resolve: {question: QuestionResolverService}},
  // {path: 'question/update/:id', component: EditQuestionComponent},
  // {path: 'question/create', component: EditQuestionComponent},
  {path: 'game/:gameId/question/update/:id', component: EditQuestionComponent},
  {path: 'users', component: UserComponent},
  {path: 'games', component: GameComponent},
  {path: 'game/create', component: AddGameComponent},
  {path: 'game/update/:id', component: AddGameComponent},
  {path: 'users/create', component: EditUserComponent},
  {path: 'users/update/:id', component: EditUserComponent},
  {path: 'auth', component: SignInComponent },
  {path: 'login', component: SignInComponent },
  // {path: 'register', component: RegisterComponent},
  {path: 'sign_up', component: SignUpComponent},
  {path: 'gameplay/:id', component: GameplayComponent, resolve: {question: GameplayResolverService}},
  {path: 'statistics', component: StatisticsComponent},
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      routes,
      {enableTracing: true} // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
