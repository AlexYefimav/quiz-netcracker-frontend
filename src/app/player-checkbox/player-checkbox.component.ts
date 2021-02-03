import {Component, Inject, OnInit} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {User} from "../model/user";
import {UserService} from "../service/user.service";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {GameAccessService} from "../service/game-access.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Game} from "../model/game";

export interface Task {
  name: string;
  completed: boolean;
  color: ThemePalette;
  subtasks?: Task[];
}

@Component({
  selector: 'app-player-checkbox',
  templateUrl: './player-checkbox.component.html',
  styleUrls: ['./player-checkbox.component.css']
})
export class PlayerCheckboxComponent implements OnInit {

  task: Task = {
    name: 'Indeterminate',
    completed: false,
    color: 'primary',
    subtasks: [
      {name: 'Primary', completed: false, color: 'primary'},
      {name: 'Accent', completed: false, color: 'accent'},
      {name: 'Warn', completed: false, color: 'warn'}
    ]
  };
  public players: Player[];
  public player: Player;

  allComplete: boolean = false;

  constructor(private playerService: PlayerService,
              private gameAceessService: GameAccessService,
              public dialogRef: MatDialogRef<PlayerCheckboxComponent>,
              @Inject(MAT_DIALOG_DATA) public gameId: any) {
  }

  async ngOnInit() {
    this.players = await this.getUser();
  }

  private getUser(): Promise<Player[]> {
    return this.playerService.getPlayers().toPromise();
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

  getAccess(){
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


}
