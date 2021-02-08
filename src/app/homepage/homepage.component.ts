import { Component, OnInit } from '@angular/core';
import {GameService} from "../service/game.service";
import {Game} from "../model/game";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {

  public game: Game;
  games: Array<Game> = [];

  constructor(private gameService: GameService) { }

  async ngOnInit() {
    this.games = await this.getTopViewedGames();
  }

  private getGameList(): Promise<Game[]> {
    return this.gameService.getPublicGame().toPromise();
  }

  private getTopViewedGames(): Promise<Game[]> {
    return this.gameService.getTopViewedGames().toPromise();
  }



}
