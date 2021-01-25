import {Component, Inject, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {Player} from "../model/player";
import {StorageService} from "../service/storage/storage.service";
import {PlayerService} from "../service/player.service";
import {GameRoom} from "../model/game-room";
import {GameRoomService} from "../service/game-room.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})
export class GameComponent implements OnInit {
  public games: Game[];
  public game: Game;
  public gameRoom: GameRoom;

  player: Player;


  constructor(private gameService: GameService,
              public dialog: MatDialog,
              private playerService: PlayerService,
              private storageService: StorageService,
              private gameRoomService: GameRoomService) {
  }

  async ngOnInit() {
    let playerId = this.storageService.currentUser.id;
    this.player = await this.getPlayer(playerId);
    this.games = await this.getGameList();

  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  private getGameList(): Promise<Game[]> {
    return this.gameService.getGame().toPromise();
  }

  async deleteGame(id: string) {
    this.game = await this.gameService.deleteGame(id).toPromise()
  }

  async getGameRoom(game: Game) {
    return  this.gameRoomService.findGameRoom(game.id, this.player.id).toPromise();
  }

  async openDialog(game: Game) {
    this.game = game;
    this.gameRoom = await this.getGameRoom(game);
    this.dialog.open(DialogElementsExampleDialog, {
      data: {name: this.player.name, gameId: game.id, gameRoom: this.gameRoom}
    });

  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-element/dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {

  constructor(@Inject(MAT_DIALOG_DATA) public data: { name, gameId, gameRoom }) {
  }


}

