import {Component, OnInit} from '@angular/core';
import {GameService} from "../service/game.service";
import {Game} from "../model/game";

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css', '../app.component.css']
})
export class HomepageComponent implements OnInit {

  public game: Game;
  games: Array<Game> = [];
  isLoading = true;

  constructor(private gameService: GameService) {
  }

  ngOnInit(): void {
    this.gameService.getTopViewedGames().subscribe(games => {
      this.games = games;
      this.isLoading = false;
    })
  }
}
