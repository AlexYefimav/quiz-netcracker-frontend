import {Component, OnInit} from '@angular/core';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {PageEvent} from '@angular/material/paginator';
import {Message} from '../model/message';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';
import {GameCategory} from "../model/game-category";
import {GameCategoryService} from "../service/game-category.service";

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
  filter: string;

  constructor(private gameService: GameService,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService,
              private gameCategoryService: GameCategoryService) {
  }

  async ngOnInit() {

      this.gameCategories = await this.getGameCategoryList();

    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    this.games = await this.getGameList();
    this.getPage(0);
  }

  private getGameCategoryList(): Promise<GameCategory[]> {
    return this.gameCategoryService.getGameCategories().toPromise();
  }

  private getGameFilteredByCategory(id : string ): Promise<Game[]> {
    return this.gameService.getGamesByCategory(id).toPromise();
  }

  private getGameList(): Promise<Game[]> {
    return this.gameService.getPublicGame().toPromise();
  }

  plusView(game: Game) {
    this.game.views = this.game.views + 1;
    this.gameService.updateGame(game);
  }

  async deleteGame(id: string) {
    this.game = await this.gameService.deleteGame(id).toPromise()
  }

  private getGamesSortedbyViews(): Promise<Game[]> {
    return this.gameService.getGamesSortedByViews().toPromise();
  }

  private getGamesSortedbyTitle(): Promise<Game[]> {
    return this.gameService.getGamesSortedByTitle().toPromise();
  }

  async sortByViews() {
    this.games = await this.getGamesSortedbyViews();
    this.pageSlice = this.games.slice(0, 3);
   //location.reload();
    //alert(this.getGamesSortedbyViews());
  }

  async sortByTitle() {
    this.games = await this.getGamesSortedbyTitle();
    this.pageSlice = this.games.slice(0, 3);
    //location.reload();
    //alert(this.getGamesSortedbyTitle());
  }

  async sortByCategory(id : string)  {
    this.games = await this.getGameFilteredByCategory(id);
    this.pageSlice = this.games.slice(0, 3);
    //location.reload();
    //alert(this.getGameFilteredByCategory(id));
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
    this.pageSlice = this.games.slice(event.pageIndex * event.pageSize, event.pageIndex * event.pageSize + event.pageSize)
  }

  // Don't use now
  // selectFile(event) {
  //   this.picture = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', this.picture);
  //   this.gameService.uploadFile(formData).subscribe(result => this.game.photo = result.photo);
  // }
}


