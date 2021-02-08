import { Component, OnInit } from '@angular/core';
import { SearchService } from '../search.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import {GameCategoryService} from "../../service/game-category.service";
import {GameCategory} from "../../model/game-category";
import {GameSearch} from "../../model/game-search";
import {Game} from "../../model/game";

@Component({
  selector: 'app-widget-search-bar-button',
  templateUrl: './widget-search-bar-button.component.html',
  styleUrls: ['./widget-search-bar-button.component.css'],
})
export class WidgetSearchBarButtonComponent implements OnInit {

  gameCategories: GameCategory[];

  searchRequest: GameSearch;

  gamesAfterFilter: Game[];

  constructor(private searchService: SearchService, private router: Router,
              private gameCategoryService: GameCategoryService) {
  }

  async ngOnInit() {
    this.gameCategories = await this.getGameCategoryList();
  }

  private getGameCategoryList(): Promise<GameCategory[]> {
    return this.gameCategoryService.getGameCategories().toPromise();
  }

  onSubmit(f: NgForm) {
    this.searchService.options$ = this.searchService.search(f.value.search);

    this.searchService.updateSelectedOption({
      id: null,
      title: null,
      description: null,
    });

    this.searchService.isOptionsEmpty$ = this.searchService.options$.pipe(
      map((options) => (options.length == 0))
    );

    this.router.navigate(['/search-results-list']);
    f.resetForm();
  }

  addCategory(gameCategoryTitle : String) {
    //this.gameCategories.add
  }



  private gameGamesSorted

  async applyFilters() {
    this.searchRequest = new GameSearch();
    this.searchRequest.gameCategories = this.gameCategories;
    this.gamesAfterFilter = await this.getGamesUsingFilters();
    console.log(this.gamesAfterFilter);
  }

   getGamesUsingFilters(): Promise<Game[]> {
    // this.searchRequest  request  = new this.searchRequest;



    return this.searchService.SearchUsingFilters(this.searchRequest).toPromise();
  }


  }

