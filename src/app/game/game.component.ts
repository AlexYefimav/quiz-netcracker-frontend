import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {StatisticsService} from "../service/statistics.service";
import {Statistics} from "../model/statistics";

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

  async deleteGame(id: string){
    this.game = await this.gameService.deleteGame(id).toPromise()
  }

  setGame(game: Game){
    this.game = game;
  }
}
