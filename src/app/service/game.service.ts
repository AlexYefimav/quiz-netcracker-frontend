import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../model/game';
import {Message} from "../model/message";
import {Photo} from "../model/photo";


@Injectable({
  providedIn: 'root',
})
export class GameService {

  url = 'http://localhost:8443/game/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getPageableGames(pageNumber: number,
                      pageSize: number): Observable<Message> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    return this.http.get<Message>(this.url + `pageable`, { params: params });}


  getGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url);
  }

  getGamesByCategory(id: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "searchByCategory/" + id);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.url + id);
  }

  getShortGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.url + "short/" + id);
  }

  getGameByTitle(name: string): Observable<Game> {
    return this.http.get<Game>(this.url + name);
  }

  getGamesSortedByViews(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "filterByViews")
  }

  getGamesSortedByTitle(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "filterByName")
  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url + 'save', game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(this.url + 'update/' + game.id, game);
  }

  deleteGame(id: string): Observable<Game> {
    return this.http.delete<Game>(this.url + 'delete/' + id);
  }

  uploadFile(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.url + 'uploadFile', formData);
  }

  updateFile(id: string, formData: FormData): Observable<Game>{
    return this.http.post<Game>(this.url + 'updateFile/' + id, formData);
  }

  getGameByPlayerId(playerId: string): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + 'player/' + playerId);
  }

  getPublicGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "public-game");
  }

  getTopViewedGames(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url + "topViewed");
  }

}




