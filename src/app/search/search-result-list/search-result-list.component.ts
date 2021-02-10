import {Component, OnInit} from '@angular/core';
import {SearchService} from '../search.service';

@Component({
  selector: 'app-search-result-list',
  templateUrl: './search-result-list.component.html',
  styleUrls: ['./search-result-list.component.css'],
})
export class SearchResultListComponent implements OnInit {

  public searchOption;

  constructor(public searchService: SearchService) {
  }

  ngOnInit(): void {
  }

  deleteGame(gameId: string) {
    this.searchService.deleteGame(gameId).subscribe(searchOption => this.searchOption = searchOption);
  }
}
