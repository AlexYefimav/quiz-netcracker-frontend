import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Game} from '../model/game';

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

  getGame(): Observable<Game[]> {
    return this.http.get<Game[]>(this.url);
  }

  getGameById(id: string): Observable<Game> {
    return this.http.get<Game>(this.url + id);
  }

  getGameByName(name: string): Observable<Game> {
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
}
