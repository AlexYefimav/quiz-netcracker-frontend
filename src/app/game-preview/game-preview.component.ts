import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
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
import {StatisticsService} from "../service/statistics.service";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css', '../app.component.css']
})

export class GamePreviewComponent implements OnInit, OnDestroy {
  webSocketAPI: WebSocketAPI;
  public game: Game;
  public gameRoom: GameRoom;
  public gameAccess: GameAccess;
  player: Player;
  authorizedAccount: User;
  isAuthorized: boolean;
  isAccess: boolean;
  private guest: string;
  isLoading = true;

  constructor(private gameService: GameService, private route: ActivatedRoute,
              private gameRoomService: GameRoomService, private storageService: StorageService,
              private gameAccessService: GameAccessService,
              private playerService: PlayerService, public dialog: MatDialog,
              private _snackBar: MatSnackBar,
              private injector: Injector,
              private statisticsService: StatisticsService) {
  }

  ngOnInit(): void {
    this.checkAuthorized();
    this.gameService.getShortGameById(this.route.snapshot.params.id).subscribe(game => {
      this.game = game;
      this.isLoading = false;
    })
    // TODO Если расскоментить 4 нижних строки, то нужно с предыдущей убрать this.isLoading = false;
    // this.gameAccessService.checkGameAccessByGameAndPlayer(this.game.id, this.player.id).subscribe(isAccess=>{
    //   this.isAccess = isAccess;
    //   this.isLoading = false;
    // })
  }

  setGame(game: Game) {
    this.game = game;
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.isAuthorized = true;
        this.authorizedAccount = this.storageService.currentUser;
        this.playerService.getPlayerByUserId(this.storageService.currentUser.id).subscribe(player => {
          this.player = player;
        })
      } else {
        StorageService.clear();
      }
    } else {
      this.isAuthorized = false;
      this.authorizedAccount = undefined;
    }
  }

  openDialog(game: Game) {
    this.game = game;
    if (!this.isAuthorized) {
      this.playerService.getGuest(this.guest).subscribe(player => {
        this.player = player;
        this.joinRoom(game);
      });
    } else {
      this.joinRoom(game);
    }
  }

  private joinRoom(game: Game) {
    this.gameRoomService.findGameRoom(game.id, this.player.id).subscribe(gameRoom => {
      this.gameRoom = gameRoom;
      this.webSocketAPI = new WebSocketAPI(this, this.player);
      this.connect();

      const dialog = this.dialog.open(DialogElementsPlayroom, {
        data: {game: game, gameRoom: this.gameRoom, player: this.player, socket: this.webSocketAPI}
      });
      dialog.afterClosed().subscribe(() => {
        this.disconnect();
      })
    });
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.gameRoomService.deletePlayer(this.gameRoom.id, this.player.id).subscribe(gameRoom => {
      this.gameRoom = gameRoom;
      this.webSocketAPI.sendPlayerExited(this.gameRoom);
      this.webSocketAPI._disconnect();
      if (!this.isAuthorized) {
        this.playerService.delete(this.player.id).subscribe();
      }
    })
  }

  handleMessage(message) {
    if (message == "go") {
      let st;
      this.statisticsService.deleteStatistics(this.player.id, this.game.id).subscribe(s => st = s);
      window.location.href = "http://localhost:4200/multiplayer/" + this.game.id + "/"
        + this.gameRoom.id + "/" + this.player.id;
    } else if (message == "delete") {
      this.dialog.closeAll();
      const translateService = this.injector.get(TranslateService);
      let message, action;
      translateService.stream('SNACKBAR_DELETE').subscribe(value => {
        message = value.MESSAGE;
        action = value.ACTION;
        this.openSnackBar(message, action);
      })
    } else {
      this.gameRoom.players = message;
    }
  }

  openDialogCreateGuest(game: Game) {
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
    this.dialog.open(DialogElementsEntryCode, {
      data: {game: game}
    });
  }

  ngOnDestroy() {
    this.disconnect();
  }
}

