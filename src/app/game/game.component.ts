import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {PageEvent} from "@angular/material/paginator";
import {Message} from "../model/message";

const pageSize: number = 3;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css']
})

export class GameComponent implements OnInit {


  public game: Game;
  public pageSlice: Game[];
  page: number;
  pageSize: number;
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  games: Array<Game> = [];
  pageIndexes: Array<number> = [];
  picture: any;


  constructor(private gameService: GameService) {
  }

  async ngOnInit() {
    await this.getPage(0);
    this.games = await this.getGameList();
    this.pageSlice = this.games.slice(0, pageSize);
  }

  private getGameList(): Promise<Game[]> {
    return this.gameService.getGame().toPromise();
  }

  async deleteGame(id: string) {
    this.game = await this.gameService.deleteGame(id).toPromise()
  }

  setGame(game: Game) {
    this.game = game;
  }

  private getPage(page: number) {
    this.gameService.getPageableGames(page, pageSize)
      .subscribe(
        (message: Message) => {
          console.log(message);
          this.games = message.games;
          this.totalPages = message.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = message.pageNumber;
          }
      );
  }

  OnPageChange(event: PageEvent) {
    this.pageSlice = this.games.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize)
  }

  // Don't use now
  selectFile(event) {
    this.picture = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.picture);
    this.gameService.uploadFile(formData).subscribe(result => this.game.photo = result.photo);
  }
}


