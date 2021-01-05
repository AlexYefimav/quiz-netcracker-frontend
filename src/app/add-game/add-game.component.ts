import { Component, OnInit, ViewChild } from '@angular/core';
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

  // tslint:disable-next-line:typedef
  ngOnInit(){
    if (this.route.snapshot.params.id != null){
      this.isUpdateGame = true;
      this.getGame(this.route.snapshot.params.id);
    } else {
      this.isUpdateGame = false;
      this.game = new Game();
    }

  }

  private getGame(gameId: string): void {
    this.gameService.getGameById(gameId).subscribe(question =>
      this.game = question);
  }

  updateGame(): void {
    this.gameService.updateGame(this.game).subscribe(question => this.game = question);
  }

  createGame(game: Game): void {
    this.gameService.createGame(game).subscribe(question => this.game = game);
  }
}
