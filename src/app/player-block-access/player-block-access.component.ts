import {Component, Inject, OnInit} from '@angular/core';
import {Player} from '../model/player';
import {PlayerService} from '../service/player.service';
import {GameAccessService} from '../service/game-access.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PlayerGiveAccessComponent} from '../player-give-access/player-give-access.component';

@Component({
  selector: 'app-player-block-access',
  templateUrl: './player-block-access.component.html',
  styleUrls: ['./player-block-access.component.css', '../app.component.css']
})
export class PlayerBlockAccessComponent implements OnInit {

  public players: Player[];
  public player: Player;

  allComplete: boolean = false;
  isLoading = true;

  constructor(private playerService: PlayerService,
              private gameAccessService: GameAccessService,
              public dialogRef: MatDialogRef<PlayerBlockAccessComponent>,
              public dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: { gameId, playerId }) {
  }

  ngOnInit(): void {
    this.gameAccessService.getPlayersWithTrueAccess(this.data.gameId).subscribe(players => {
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

  blockAccess(): void {
    if (this.players == null) {
      return;
    }
    this.players.forEach(player => {
        if (player.isCompleted) {
          this.gameAccessService.deactivateGameForPlayers(this.data.gameId, player.id).subscribe();
        }
      }
    )
    this.onNoClick();
  }

  giveAccess(gameId, playerId: string): void {
    this.onNoClick();
    this.dialog.open(PlayerGiveAccessComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: {gameId: gameId, playerId: playerId}
    });
  }

}
