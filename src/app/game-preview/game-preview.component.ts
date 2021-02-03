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
import {WebSocketAPI} from "../webSocket/web-socket-api";
import {User} from "../model/user";
import {SignInComponent} from "../sign-in/sign-in.component";
import {SignInOnceComponent} from "../sign-in-once/sign-in-once.component";
import {GameAccessService} from "../service/game-access.service";

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
  authorizedAccount: User;
  isAuthorized: boolean;
  isAccess: boolean;

  constructor(private gameService: GameService, private route: ActivatedRoute,
              private gameRoomService: GameRoomService, private storageService: StorageService,
              private gameAccessService: GameAccessService,
              private playerService: PlayerService, public dialog: MatDialog) {
  }

  async ngOnInit() {
    this.checkAuthorized();
    this.id = this.route.snapshot.params.id;
    this.game = await this.getGameById();
    let playerId = this.storageService.currentUser.id;
    this.player = await this.getPlayer(playerId);
    this.isAccess= await this.getGameAccessByGameAndPlayer(this.game.id, this.player.id);
  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  private getGameById(): Promise<Game> {
    return this.gameService.getGameById(this.id).toPromise()
  }

  private getGameAccessByGameAndPlayer(gameId,playerId: string): Promise<boolean> {
    return this.gameAccessService.getGameAccessByGameAndPlayer(gameId, playerId).toPromise()
  }

  setGame(game: Game) {
    this.game = game;
  }

  getGameRoom(game: Game) {
    return this.gameRoomService.findGameRoom(game.id, this.player.id).toPromise();
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.isAuthorized=true;
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.isAuthorized=false;
      this.authorizedAccount= undefined;
    }
  }

  checkAccess() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.isAuthorized=true;
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.isAuthorized=false;
      this.authorizedAccount= undefined;
    }
  }

  openLoginDialog(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      minWidth: '400px',
      minHeight: '300px',
      data: this.authorizedAccount
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authorizedAccount = result;
        this.isAuthorized = true;
      }
      setTimeout(() => {
        this.checkAuthorized();
        location.reload();
      }, 2000);
    });
  }


  async openDialog(game: Game) {
    this.game = game;
    this.gameRoom = await this.getGameRoom(game);
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
  styleUrls: ['dialog-element/dialog-elements-example-dialog.css']
})
export class DialogElementsExampleDialog {
  isCreator: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: { game, gameRoom, player, socket }) {
    if (this.data.player.id == this.data.game.player) {
      this.isCreator = true;
    }
  }

  startGame() {
    this.data.socket.sendGoGame(this.data.gameRoom);
    this.data.socket.disconnect();
  }

}

