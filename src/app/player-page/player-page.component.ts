import {Component, Injector, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {Player} from "../model/player";
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {SignInComponent} from "../sign-in/sign-in.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";

import {PlayerGiveAccessComponent} from "../player-give-access/player-give-access.component";


import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css', '../app.component.css']
})
export class PlayerPageComponent implements OnInit {
  player: Player;
  games: Game[] = [];
  displayedColumns: string[] = ['position', 'name', 'play', 'edit', 'delete', 'share'];
  isLoading = true;

  constructor(private playerService: PlayerService,
              private storageService: StorageService,
              private gameService: GameService,
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private injector: Injector) {
  }

  async ngOnInit() {
    this.player = await this.getPlayer();
    this.games = await this.getGames();
    for (let i = 0; i < this.games.length; i++) {
      this.games[i].index = i + 1;
    }
    this.isLoading = false
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  getPlayer(): Promise<Player> {
    return this.playerService.getPlayerByUserId(this.storageService.currentUser.id).toPromise()
  }

  getGames(): Promise<Game[]> {
    return this.gameService.getGameByPlayerId(this.player.id).toPromise();
  }

  async deleteGame(id: string) {
    await this.gameService.deleteGame(id).toPromise();
    this.games = this.games.filter(g => g.id != id);
  }

  shareGame(gameId, playerId: string): void {
    const dialogRef = this.dialog.open(PlayerGiveAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: {gameId: gameId, playerId: playerId}
    });
  }

  openSnackBar(game: string) {
    const translateService = this.injector.get(TranslateService);
    let message, action;
    translateService.stream('SNACKBAR_COPY').subscribe(value => {
      message = value.MESSAGE_FIRST + game + value.MESSAGE_SECOND;
      action = value.ACTION;
    })
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
