import {Component, OnInit} from '@angular/core';

import {PlayerService} from '../service/player.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {Player} from "../model/player";
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {SignInComponent} from "../sign-in/sign-in.component";
import {MatDialog, MatDialogRef} from "@angular/material/dialog";
import {PlayerCheckboxComponent} from "../player-checkbox/player-checkbox.component";
//import {Dialog} from '../../model/dialog';
//import {DialogsService} from '../../service/dialogs/dialogs.service';
//import {ScheduleEnum} from '../../model/schedule.enum';

@Component({
  selector: 'app-client-page',
  templateUrl: './player-page.component.html',
  styleUrls: ['./player-page.component.css']
})
export class PlayerPageComponent implements OnInit {
  player: Player;
  games: Game[] = [];
  displayedColumns: string[] = ['position', 'name', 'play', 'delete', 'share'];

  constructor(private playerService: PlayerService,
              private storageService: StorageService,
              private gameService: GameService,
              private router: Router,
              public dialog: MatDialog) {
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
    return this.playerService.getOnePlayer(this.storageService.currentUser.id).toPromise()
  }

  getGames(): Promise<Game[]> {
    return this.gameService.getGameByPlayerId(this.player.id).toPromise();
  }

  async deleteGame(id: string) {
    await this.gameService.deleteGame(id).toPromise()
  }

  shareGame(gameId: string): void {
    const dialogRef = this.dialog.open(PlayerCheckboxComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: gameId
    });
}
}
