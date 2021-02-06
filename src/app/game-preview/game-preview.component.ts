import {Component, Inject, Injector, OnInit} from '@angular/core';
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {GameRoomService} from "../service/game-room.service";
import {StorageService} from "../service/storage/storage.service";
import {GameRoom} from "../model/game-room";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {WebSocketAPI} from "../webSocket/web-socket-api";
import {User} from "../model/user";
import {GameAccessService} from "../service/game-access.service";
import {DialogElementsPlayroom} from "./dialog-element/playroom/dialog-elements-playroom";
import {DialogElementsCreateGuest} from "./dialog-element/create-guest/dialog-elements-create-guest";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogElementsEntryCode} from "./dialog-element/entry-code/dialog-elements-entry-code";
import {TranslateService} from "@ngx-translate/core";
import {GameAccess} from "../model/game-access";
import {Observable} from "rxjs/internal/Observable";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})

export class GamePreviewComponent implements OnInit {
  webSocketAPI: WebSocketAPI;
  public game: Game;
  public gameRoom: GameRoom;
  public gameAccess: GameAccess;
  player: Player;
  authorizedAccount: User;
  isAuthorized: boolean;
  isAccess: boolean;
  private guest: string;

  constructor(private gameService: GameService, private route: ActivatedRoute,
              private gameRoomService: GameRoomService, private storageService: StorageService,
              private gameAccessService: GameAccessService,
              private playerService: PlayerService, public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private injector: Injector) {
  }

  async ngOnInit() {
    await this.checkAuthorized();
    this.game = await this.getGameById(this.route.snapshot.params.id);
    //this.gameAccess= await this.getGameAccessByGameAndPlayer(this.game.id, this.authorizedAccount.id);
     this.isAccess = await this.checkGameAccessByGameAndPlayer(this.game.id, this.player.id);
  }

  getPlayer(userId: string): Promise<Player> {
    return this.playerService.getPlayerByUserId(userId).toPromise();
  }

  private getGameById(gameId: string): Promise<Game> {
    return this.gameService.getShortGameById(gameId).toPromise()
  }

  async getGameAccessByGameAndPlayer(gameId, playerId: string): Promise<GameAccess> {
    return this.gameAccessService.getGameAccessByGameAndPlayer(gameId, playerId).toPromise();
  }

  async checkGameAccessByGameAndPlayer(gameId, playerId: string): Promise<boolean> {
    return this.gameAccessService.checkGameAccessByGameAndPlayer(gameId, playerId).toPromise();
  }

  setGame(game: Game) {
    this.game = game;
  }

  getGameRoom(game: Game) {
    return this.gameRoomService.findGameRoom(game.id, this.player.id).toPromise();
  }

  async checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.isAuthorized = true;
        this.authorizedAccount = this.storageService.currentUser;
        this.player = await this.getPlayer(this.storageService.currentUser.id);
      } else {
        StorageService.clear();
      }
    } else {
      this.isAuthorized = false;
      this.authorizedAccount = undefined;
    }
  }

  async openDialog(game: Game) {
    this.game = game;
    if (!this.isAuthorized) {
      this.player = await this.playerService.getGuest(this.guest).toPromise();
    }
    this.gameRoom = await this.getGameRoom(game);
    this.webSocketAPI = new WebSocketAPI(this, this.player, this.gameRoom.id, this.gameRoomService);
    this.connect();

    const dialog = this.dialog.open(DialogElementsPlayroom, {
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
    if (!this.isAuthorized) {
      await this.playerService.delete(this.player.id).toPromise();
    }
  }

  async handleMessage(message) {
    if (message == "go") {
      window.location.href = "http://localhost:4200/multiplayer/" + this.game.id + "/"
        + this.gameRoom.id + "/" + this.player.id;
    } else if (message == "delete") {
      this.dialog.closeAll();
      const translateService = this.injector.get(TranslateService);
      let message, action;
      translateService.stream('SNACKBAR_DELETE').subscribe(value => {
        message = value.MESSAGE;
        action = value.ACTION;
      })
      this.openSnackBar(message, action);
    } else {
      this.gameRoom.players = message;
    }
  }

  private deletePlayer(): Promise<GameRoom> {
    return this.gameRoomService.deletePlayer(this.gameRoom.id, this.player.id).toPromise()
  }

  async openDialogCreateGuest(game: Game) {
    const dialog = this.dialog.open(DialogElementsCreateGuest, {
      data: {guest: this.guest}
    });
    dialog.afterClosed().subscribe(result => {
      if (result == undefined) {
        return;
      }
      this.guest = result;
      this.openDialog(game);
    });
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  openDialogEntryCode(game: Game) {
    const dialog = this.dialog.open(DialogElementsEntryCode, {
      data: {game: game}
    });
    dialog.afterClosed().subscribe(result => {

    });
  }
}

