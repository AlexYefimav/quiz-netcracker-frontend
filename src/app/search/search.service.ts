import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/internal/Observable';
import {SearchOption} from './searchOption';
import {BehaviorSubject} from 'rxjs';
import {Game} from "../model/game";
import {GameSearch} from "../model/game-search";

@Injectable({
  providedIn: 'root',
})
export class SearchService {
  private SERVER_URL = 'http://localhost:8443/';

  private selectedOption = new BehaviorSubject<SearchOption>({
    id: null,
    description: null,
    title: null,
    photo: null,
  });

  private selectedOptions = new BehaviorSubject<SearchOption[]>([]);

  option$ = this.selectedOption.asObservable();
  options$ = this.selectedOptions.asObservable();
  isOptionEmpty$: Observable<boolean>;
  isOptionsEmpty$: Observable<boolean>;

  constructor(private http: HttpClient) {
  }

  search(q: string): Observable<SearchOption[]> {
    return this.http.get<SearchOption[]>(this.SERVER_URL + 'game/searchByTitle/' + q);
  }

  SearchUsingFilters(request: GameSearch): Observable<Game[]> {

    return this.http.post<Game[]>(this.SERVER_URL + 'game/findByFilter', request);
  }

  getGamesSortedByViews(): Observable<Game[]> {
    return this.http.get<Game[]>(this.SERVER_URL + "game/filterByViews")
  }

  getGamesSortedByTitle(): Observable<Game[]> {
    return this.http.get<Game[]>(this.SERVER_URL + "game/filterByTitle")
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
