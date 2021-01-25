import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {UserComponent} from './user/user.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {GameplayComponent} from "./gameplay/gameplay.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {PlayerPageComponent} from "./player-page/player-page.component";

const routes: Routes = [

  {path: 'game/:gameId/question/update/:id', component: EditQuestionComponent},
  {path: 'users', component: UserComponent},
  {path: 'games', component: GameComponent},
  {path: 'game/create', component: AddGameComponent},
  {path: 'game/update/:id', component: AddGameComponent},
  {path: 'users/create', component: EditUserComponent},
  {path: 'users/update/:id', component: EditUserComponent},
  {path: 'auth', component: SignInComponent},
  {path: 'login', component: SignInComponent},
  {path: 'sign_up', component: SignUpComponent},
  {path: 'gameplay/:gameId/:gameRoomId', component: GameplayComponent},
  {path: 'statistics/:id', component: StatisticsComponent},
  {path: 'player/:id', component: PlayerPageComponent},

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
