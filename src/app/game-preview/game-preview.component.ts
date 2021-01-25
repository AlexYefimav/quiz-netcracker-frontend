import { Component, OnInit } from '@angular/core';
import {Game} from "../model/game";
import {GameService} from "../service/game.service";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-game-preview',
  templateUrl: './game-preview.component.html',
  styleUrls: ['./game-preview.component.css']
})
export class GamePreviewComponent implements OnInit {


  public game: Game;
  public id : string;

  constructor(private gameService: GameService, private route: ActivatedRoute) {


  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params.id;
    this.getGameById();
  }

  private getGameById(): void {
    this.gameService.getGameById(this.id).subscribe(game => {
      this.game = game;
    });
  }

  setGame(game: Game){
    this.game = game;
  }

}
