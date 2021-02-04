import {Component, Inject, OnInit} from '@angular/core';
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {GameAccessService} from "../service/game-access.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";
import {PlayerGiveAccessComponent} from "../player-give-access/player-give-access.component";

@Component({
  selector: 'app-player-block-access',
  templateUrl: './player-block-access.component.html',
  styleUrls: ['./player-block-access.component.css']
})
export class PlayerBlockAccessComponent implements OnInit {

  public players: Player[];
  public player: Player;

  allComplete: boolean = false;

  constructor(private playerService: PlayerService,
              private gameAceessService: GameAccessService,
              public dialogRef: MatDialogRef<PlayerBlockAccessComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public gameId: any) {
  }

  async ngOnInit() {
    this.players = await this.getUser();
  }

  private getUser(): Promise<Player[]> {
    return this.gameAceessService.getPlayersWithTrueAccess(this.gameId).toPromise();
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

  blockAccess(){
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => {
        if (player.isCompleted) {
          this.gameAceessService.activateGameForPlayers(this.gameId,player.id).toPromise()
        }
      }
    )
    this.onNoClick();
  }

  giveAccess(gameId: string): void {
    this.onNoClick();
    const dialogRef = this.dialog.open(PlayerGiveAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: gameId
    });
  }

}
