import {Component, OnInit} from '@angular/core';
import {Observable, of, Subject} from 'rxjs';
import {SearchService} from '../search.service';
import {SearchOption} from '../searchOption';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {debounceTime, distinctUntilChanged, map, switchMap,} from 'rxjs/operators';

@Component({
  selector: 'app-widget-search-bar',
  templateUrl: './widget-search-bar.component.html',
  styleUrls: ['./widget-search-bar.component.css'],
})
export class WidgetSearchBarComponent implements OnInit {
  searchResults$: Observable<SearchOption[]>;
  term$ = new Subject<string>();
  windowOpen$: Observable<boolean>;

  constructor(private searchService: SearchService, private router: Router) {
    this.searchResults$ = this.term$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap((term) =>
        term.length == 0 ? of([]) : this.searchService.search(term)
      )
    );
  }

  ngOnInit(): void {
    this.windowOpen$ = this.searchResults$.pipe(
      map((searchOptionsArr) => (searchOptionsArr.length > 0))
    );
  }

  searchOption(option: SearchOption) {
    let emptyArray: SearchOption[] = [];
    this.searchService.updateSelectedOptions(emptyArray);
    this.searchService.updateSelectedOption(option);
    this.searchService.isOptionEmpty$ = this.searchService.option$.pipe(
      map((option) => (option.id == null))
    );
    this.router.navigate(['/search-results-item']);
  }

  onSubmit(f: NgForm) {
    this.searchService.options$ = this.searchService.search(f.value.search);

    this.searchService.updateSelectedOption({
      id: null,
      description: null,
      title: null,
      photo: null,
    });

    this.searchService.isOptionsEmpty$ = this.searchService.options$.pipe(
      map((options) => (options.length == 0))
    );

    this.router.navigate(['/search-results-list']);
    f.resetForm();
  }

  onblur() {
    this.term$.next('');
  }
}
