import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';

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

  ngOnInit(): void {
    this.getGameList();
  }

  private getGameList(): void {
    this.gameService.getGame().subscribe(game => {
      this.games = game;
    });
  }

  deleteGame(gameId: string) {
    this.gameService.deleteGame(gameId).subscribe(game => this.game = game);
  }

  setGame(game: Game){
    this.game = game;
  }
}
