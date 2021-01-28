import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { SearchOption } from './searchOption';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import {Game} from "../model/game";

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SERVER_URL = 'http://localhost:8085/';

  constructor(private http: HttpClient) {}

  private selectedOption = new BehaviorSubject<SearchOption>({
    id: null,

    description: null,
    title: null,
  });

  private selectedOptions = new BehaviorSubject<SearchOption[]>([]);

  option$ = this.selectedOption.asObservable();
  options$ = this.selectedOptions.asObservable();

  isOptionEmpty$: Observable<boolean>;

  isOptionsEmpty$: Observable<boolean>;

  search(q: string): Observable<SearchOption[]> {
    return this.http.get<SearchOption[]>(this.SERVER_URL + 'game/searchByTitle/' +q );
  }

  updateSelectedOption(option: SearchOption) {
    this.selectedOption.next(option);
  }

  updateSelectedOptions(options: SearchOption[]) {
    this.selectedOptions.next(options);
  }

  deleteGame(id: string): Observable<Game> {
    return this.http.delete<Game>(this.SERVER_URL + 'delete/' + id);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(this.SERVER_URL + 'update/' + game.id, game);
  }
}
