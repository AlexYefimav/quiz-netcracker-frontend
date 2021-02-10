import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';
import {NgForm} from '@angular/forms';
import {Router} from '@angular/router';
import {map} from 'rxjs/operators';
import {GameCategoryService} from '../../service/game-category.service';
import {GameCategory} from '../../model/game-category';
import {GameSearch} from '../../model/game-search';
import {Game} from '../../model/game';

@Component({
  selector: 'app-widget-search-bar-button',
  templateUrl: './widget-search-bar-button.component.html',
  styleUrls: ['./widget-search-bar-button.component.css', '../../app.component.css'],
})
export class WidgetSearchBarButtonComponent implements OnInit {

  gameCategories: GameCategory[];
  searchRequest: GameSearch;
  gamesAfterFilter: Game[];
  isLoading = false;

  constructor(private searchService: SearchService, private router: Router,
              private gameCategoryService: GameCategoryService) {
  }

  ngOnInit(): void {
    this.gameCategoryService.getGameCategories().subscribe(gameCategories=>{
      this.gameCategories = gameCategories;
    })
  }

  onSubmit(f: NgForm) {
    this.searchService.options$ = this.searchService.search(f.value.search);

    this.searchService.updateSelectedOption({
      id: null,
      title: null,
      description: null,
      photo: null,
    });

    this.searchService.isOptionsEmpty$ = this.searchService.options$.pipe(
      map((options) => (options.length == 0))
    );

    this.router.navigate(['/search-results-list']);
    f.resetForm();
  }

  applyFilters(): void {
    this.isLoading = true;
    this.searchRequest = new GameSearch();
    this.searchRequest.gameCategories = this.gameCategories;
    this.searchService.SearchUsingFilters(this.searchRequest).subscribe(gamesAfterFilter=>{
      this.gamesAfterFilter = gamesAfterFilter;
      this.isLoading = false;
    })
  }
}

