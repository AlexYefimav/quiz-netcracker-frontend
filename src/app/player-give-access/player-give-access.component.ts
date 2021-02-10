import {Component, Inject, OnInit} from '@angular/core';
import {Player} from '../model/player';
import {PlayerService} from '../service/player.service';
import {GameAccessService} from '../service/game-access.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PlayerBlockAccessComponent} from '../player-block-access/player-block-access.component';

@Component({
  selector: 'app-player-checkbox',
  templateUrl: './player-give-access.component.html',
  styleUrls: ['./player-give-access.component.css', '../app.component.css']
})
export class PlayerGiveAccessComponent implements OnInit {

  public players: Player[];
  public player: Player;

  allComplete: boolean = false;
  isLoading = true;

  constructor(private playerService: PlayerService,
              private gameAccessService: GameAccessService,
              public dialogRef: MatDialogRef<PlayerGiveAccessComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { gameId, playerId }) {
  }

  ngOnInit(): void {
    this.gameAccessService.getPlayersWithFalseAccess(this.data.gameId).subscribe(players => {
      this.players = players;
      this.isLoading = false;
    });
  }

  updateAllComplete(): void {
    this.allComplete = this.players != null && this.players.every(player => player.isCompleted);
  }

  someComplete(): boolean {
    if (this.players == null) {
      return false;
    }
    return this.players.filter(player => player.isCompleted).length > 0 && !this.allComplete;
  }

  setAll(completed: boolean): void {
    this.allComplete = completed;
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => player.isCompleted = completed);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  giveAccess(): void {
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => {
        if (player.isCompleted) {
          this.gameAccessService.sendActivateCode(this.data.gameId, player.id).subscribe();
        }
      }
    )
    this.onNoClick();
  }

  blockAccess(gameId, playerId: string): void {
    this.onNoClick();
    this.dialog.open(PlayerBlockAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: {gameId: gameId, playerId: playerId}
    });
  }

}
