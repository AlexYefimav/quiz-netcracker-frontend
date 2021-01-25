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

  constructor(private gameService: GameService) {
  }

  async ngOnInit() {
    this.games = await this.getGameList();
  }

  private getGameList(): Promise<Game[]> {
    return this.gameService.getGame().toPromise();
  }

  async deleteGame(id: string) {
    this.game = await this.gameService.deleteGame(id).toPromise()
  }
}

