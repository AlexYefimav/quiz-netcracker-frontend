import {Component, Inject, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {GameAccessService} from "../service/game-access.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Game} from "../model/game";
import {Router} from "@angular/router";
import {PlayerBlockAccessComponent} from "../player-block-access/player-block-access.component";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-player-checkbox',
  templateUrl: './player-give-access.component.html',
  styleUrls: ['./player-give-access.component.css']
})
export class PlayerGiveAccessComponent implements OnInit {

  public players: Player[];
  public player: Player;

  allComplete: boolean = false;

  constructor(private playerService: PlayerService,
              private gameAccessService: GameAccessService,
              public dialogRef: MatDialogRef<PlayerGiveAccessComponent>,
              private router: Router,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { gameId, playerId }) {
  }

  async ngOnInit() {
    this.players = await this.getUser();
  }

  private getUser(): Promise<Player[]> {
    return this.gameAccessService.getPlayersWithFalseAccess(this.data.gameId).toPromise();
  }

  updateAllComplete() {
    this.allComplete = this.players != null && this.players.every(player => player.isCompleted);
  }

  someComplete(): boolean {
    if (this.players == null) {
      return false;
    }
    return this.players.filter(player => player.isCompleted).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean) {
    this.allComplete = completed;
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => player.isCompleted = completed);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  giveAccess(){
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => {
        if (player.isCompleted) {
          this.gameAccessService.sendActivateCode(this.data.gameId,player.id).toPromise()
        }
      }
    )
    this.onNoClick();
  }

  blockAccess(gameId, playerId: string): void {
    this.onNoClick();
    const dialogRef = this.dialog.open(PlayerBlockAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: {gameId: gameId, playerId: playerId}
    });
  }

}
