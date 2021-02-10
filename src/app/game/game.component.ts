import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {PageEvent} from '@angular/material/paginator';
import {Message} from '../model/message';
import {GameCategory} from '../model/game-category';
import {GameCategoryService} from '../service/game-category.service';

const pageSize: number = 3;

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css', '../app.component.css']
})

export class GameComponent implements OnInit {

  public game: Game;
  gameCategories: GameCategory[];
  public pageSlice: Game[];
  page: number;
  pageSize: number;
  currentSelectedPage: number = 0;
  totalPages: number = 0;
  games: Array<Game> = [];
  pageIndexes: Array<number> = [];
  isLoading = true;

  constructor(private gameService: GameService,
              private gameCategoryService: GameCategoryService) {
  }

  ngOnInit(): void {
    this.gameCategoryService.getGameCategories().subscribe(gameCategories => {
      this.gameCategories = gameCategories;
    })

    this.gameService.getPublicGame().subscribe(games => {
      this.games = games;
      this.getPage(0);
    })
  }

  plusView(game: Game) {
    this.game.views = this.game.views + 1;
    this.gameService.updateGame(game);
  }

  sortByViews() {
    this.gameService.getGamesSortedByViews().subscribe(games => {
      this.games = games;
    });
    this.pageSlice = this.games.slice(0, 3);
    //location.reload();
    //alert(this.getGamesSortedbyViews());
  }

  sortByTitle() {
    this.gameService.getGamesSortedByTitle().subscribe(games => {
      this.games = games;
    })
    this.pageSlice = this.games.slice(0, 3);
  }

  sortByCategory(id: string) {
    this.gameService.getGamesByCategory(id).subscribe(games => {
      this.games = games;
    })
    this.pageSlice = this.games.slice(0, 3);
  }

  setGame(game: Game) {
    this.game = game;
  }

  private getPage(page: number) {
    this.gameService.getPageableGames(page, pageSize)
      .subscribe(
        (message: Message) => {
          this.pageSlice = this.games.slice(0, pageSize);
          this.totalPages = message.totalPages;
          this.pageIndexes = Array(this.totalPages).fill(0).map((x, i) => i);
          this.currentSelectedPage = message.pageNumber;
          this.isLoading = false;
        }
      );
  }

  OnPageChange(event: PageEvent) {
    this.pageSlice = this.games.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize);
  }
}


