import {Component, Inject, OnInit} from '@angular/core';
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {ActivatedRoute, Route} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {GameRoomService} from "../service/game-room.service";
import {StorageService} from "../service/storage/storage.service";
import {GameRoom} from "../model/game-room";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {WebSocketAPI} from "../webSocket/web-socket-api";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})

export class GamePreviewComponent implements OnInit {
  webSocketAPI: WebSocketAPI;
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

  getGameRoom(game: Game) {
    return this.gameRoomService.findGameRoom(game.id, this.player.id).toPromise();
  }

  async openDialog(game: Game) {
    this.game = game;
    this.gameRoom = await this.getGameRoom(game);
    console.log(this.gameRoom.players);
    this.webSocketAPI = new WebSocketAPI(this, this.player, this.gameRoom.id, this.gameRoomService);
    this.connect();

    const dialog = this.dialog.open(DialogElementsExampleDialog, {
      data: {game: game, gameRoom: this.gameRoom, player: this.player, socket: this.webSocketAPI}
    });
    dialog.afterClosed().subscribe(() => {
      this.disconnect();
    })
  }

  connect() {
    this.webSocketAPI._connect();
  }

  async disconnect() {
    this.gameRoom = await this.deletePlayer();
    this.webSocketAPI.sendPlayerExited(this.gameRoom);
    this.webSocketAPI._disconnect();
  }

  async handleMessage(message) {
    if (message == "go") {
      window.location.href = "http://localhost:4200/multiplayer/" + this.game.id + "/" + this.gameRoom.id;
    } else {
      this.gameRoom.players = message;
    }
  }

  private deletePlayer(): Promise<GameRoom> {
    return this.gameRoomService.deletePlayer(this.gameRoom.id, this.player.id).toPromise()
  }
}

@Component({
  selector: 'dialog-elements-example-dialog',
  templateUrl: 'dialog-element/dialog-elements-example-dialog.html',
})
export class DialogElementsExampleDialog {
  isCreator: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: {game, gameRoom, player, socket}) {
    if (this.data.player.id == this.data.game.player) {
      this.isCreator = true;
    }
  }

  startGame(){
    this.data.socket.sendGoGame(this.data.gameRoom);
    this.data.socket.disconnect();
  }
}

