import {Component, Injector, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {Player} from '../model/player';
import {Game} from '../model/game';
import {GameService} from '../service/game.service';
import {MatDialog} from '@angular/material/dialog';

import {PlayerGiveAccessComponent} from '../player-give-access/player-give-access.component';


import {MatSnackBar} from '@angular/material/snack-bar';
import {TranslateService} from '@ngx-translate/core';
import {StatisticsService} from '../service/statistics.service';

@Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css', '../app.component.css']
})
export class PlayerPageComponent implements OnInit {
  player: Player;
  createdGames: Game[] = [];
  passedGame: Game[] = [];
  displayedColumns: string[] = ['position', 'name', 'play', 'edit', 'delete', 'share'];
  isLoading = true;
  displayedColumnsStatistics: string[] = ['position', 'name', 'play', 'delete'];

  constructor(private playerService: PlayerService,
              private storageService: StorageService,
              private gameService: GameService,
              private router: Router,
              public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private injector: Injector,
              private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.playerService.getPlayerByUserId(this.storageService.currentUser.id).subscribe(player=>{
      this.player = player;
      this.gameService.getGameByPlayerId(this.player.id).subscribe(createdGames=>{
        this.createdGames = createdGames;
        for (let i = 0; i < this.createdGames.length; i++) {
          this.createdGames[i].index = i + 1;
        }
        this.statisticsService.getGameWithStatistics(this.player.id).subscribe(passedGame=>{
          this.passedGame = passedGame;
          for (let i = 0; i < this.passedGame.length; i++) {
            this.passedGame[i].index = i + 1;
          }
          this.isLoading = false;
        });
      });
    });
  }

  redirect(url: string) {
    this.router.navigate([url]);
  }

  deleteGame(id: string): void {
    this.gameService.deleteGame(id, this.player.id).subscribe(()=>{
      this.createdGames = this.createdGames.filter(g => g.id != id);
    });
  }

  shareGame(gameId, playerId: string): void {
    this.dialog.open(PlayerGiveAccessComponent, {
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
      this._snackBar.open(message, action, {
        duration: 2000,
      });
    })
  }

  deleteStatistics(gameId: string): void {
    this.statisticsService.deleteStatistics(this.player.id, gameId).subscribe(()=>{
      this.passedGame = this.passedGame.filter(g => g.id != gameId);
    });
  }
}
