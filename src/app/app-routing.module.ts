import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {EditQuestionComponent} from "./edit-question/edit-question.component";
import {UserComponent} from './user/user.component';
import {GameComponent} from "./game/game.component";
import {AddGameComponent} from "./add-game/add-game.component";
import {EditUserComponent} from "./edit-user/edit-user.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {GameplayComponent} from "./single-player-game/gameplay.component";
import {StatisticsComponent} from "./statistics/statistics.component";
import {PlayerPageComponent} from "./player-page/player-page.component";
import {GamePreviewComponent} from "./game-preview/game-preview.component";
import {ErrorAuthenticationConnectionComponent} from "./error-authentication-connection/error-authentication-connection.component";
import {MultiplayerComponent} from "./multiplayer/multiplayer.component";
import {EditPlayerComponent} from "./edit-player/edit-player.component";
import {LeaderboardsComponent} from "./leaderboards/leaderboards.component";
import {ActivateAccountComponent} from "./activate-account/activate-account.component";
import {Sign_up_and_sing_in} from "./service/can-activate/sign_up_and_sing_in";
import {CanActivatePlayer} from "./service/can-activate/can-activate-player";
import {UpdateGame} from "./service/can-activate/update-game";

const routes: Routes = [

  {path: 'users', component: UserComponent},
  {path: 'games', component: GameComponent},
  {path: 'game/create', component: AddGameComponent},
  {path: 'game/update/:gameId', component: AddGameComponent},
  {path: 'users/create', component: EditUserComponent},
  {path: 'users/update/:id', component: EditUserComponent},
  {path: 'player/update/:id', component: EditPlayerComponent},
  {path: 'sign_in', component: SignInComponent, canActivate: [Sign_up_and_sing_in]},
  {path: 'sign_up', component: SignUpComponent, canActivate: [Sign_up_and_sing_in]},
  {path: 'multiplayer/:gameId/:gameRoomId/:playerId', component: MultiplayerComponent},
  {path: 'single-player-game/:gameId', component: GameplayComponent},
  {path: 'statistics/:gameId/:playerId', component: StatisticsComponent},
  {path: 'user/:id', component: PlayerPageComponent},
  {path: 'game/:id', component: GamePreviewComponent},
  {path: 'player/:id', component: PlayerPageComponent},
  {path: '403', component: ErrorAuthenticationConnectionComponent},
  {path: 'leaderboards', component: LeaderboardsComponent},
  {path: 'activate/:code', component: ActivateAccountComponent}
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
