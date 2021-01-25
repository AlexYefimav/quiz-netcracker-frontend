import {Component, Inject, OnInit} from '@angular/core';
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GameRoomService} from "../service/game-room.service";
import {StorageService} from "../service/storage/storage.service";
import {GameRoom} from "../model/game-room";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent implements OnInit {


  public game: Game;
  public id: string;

  public gameRoom: GameRoom;

  player: Player;

  constructor(private gameService: GameService, private route: ActivatedRoute,
              private gameRoomService: GameRoomService, private storageService: StorageService,
              private playerService: PlayerService, public dialog: MatDialog) {


  }

  async ngOnInit() {
    this.id = this.route.snapshot.params.id;
    this.game = await this.getGameById();
    let playerId = this.storageService.currentUser.id;
    this.player = await this.getPlayer(playerId);
  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  private getGameById(): Promise<Game> {
    return this.gameService.getGameById(this.id).toPromise()
  }

  setGame(game: Game) {
    this.game = game;
  }

  async getGameRoom(game: Game) {
    return this.gameRoomService.findGameRoom(game.id, this.player.id).toPromise();
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

