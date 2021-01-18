import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../service/game.service';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  game: Game;
  isUpdateGame: boolean;

  constructor(private gameService: GameService, private route: ActivatedRoute) {

  }

  async ngOnInit() {
    if (this.route.snapshot.params.id != null){
      this.isUpdateGame = true;
      this.game = await this.getGame(this.route.snapshot.params.id);
    } else {
      this.isUpdateGame = false;
      this.game = new Game();
      this.game.questions = [];
      this.game.id = null;
    }
  }

  private getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  async updateGame() {
    this.game = await this.updateAndGetGame();
  }

  async createGame(game: Game) {
    if (game.questions.length === 0) {
      this.game = await this.createAndGetGame(game);
    }
    else {
      this.game = await this.updateAndGetGame();
    }
  }

  createAndGetGame(game: Game): Promise<Game> {
    return this.gameService.createGame(game).toPromise();
  }

  updateAndGetGame(): Promise<Game> {
    return this.gameService.updateGame(this.game).toPromise();
  }
}
