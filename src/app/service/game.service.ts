import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../model/game';
import {Message} from "../model/message";
import {Photo1} from "../photo1";

@Injectable({
  providedIn: 'root',
})
export class GameService {

  url = 'http://localhost:8085/game/';

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

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.url + id);
  }

  getGameByTitle(name: string): Observable<Game> {
    return this.http.get<Game>(this.url + name);
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

  public uploadFile(formData: FormData): Observable<Photo1> {
    return this.http.post<Photo1>(this.url + 'uploadFile', formData);
  }
}




