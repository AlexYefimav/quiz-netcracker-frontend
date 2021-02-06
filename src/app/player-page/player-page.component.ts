import {Component, OnInit} from '@angular/core';

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

  @Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {
  player: Player;
  games: Game[] = [];
  displayedColumns: string[] = ['position', 'name', 'play', 'edit', 'delete', 'share'];

  constructor(private playerService: PlayerService,
              private storageService: StorageService,
              private gameService: GameService,
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.player = await this.getPlayer();
    this.games = await this.getGames();
    for (let i = 0; i < this.games.length; i++) {
      this.games[i].index = i + 1;
    }
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
    await this.gameService.deleteGame(id).toPromise()
  }

  shareGame(gameId, playerId: string): void {
    const dialogRef = this.dialog.open(PlayerGiveAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: {gameId: gameId, playerId: playerId}
    });
  }

  openSnackBar(game: string) {
    this._snackBar.open('Link to the game "'+ game + '" copied','Copy', {
      duration: 2000,
    });
  }
}
