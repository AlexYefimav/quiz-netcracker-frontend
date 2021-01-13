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
    return this.http.get<Game[]>(this.url + 'all');
  }

  getGameById(gameId: string): Observable<Game> {
    return this.http.get<Game>(this.url + 'findGame/' + gameId);
  }

//  getGameByName(gameName: string): Observable<Game> {
//    return this.http.get<Game>(this.url + 'findGame/' + gameName);
//  }

  createGame(game: Game): Observable<Game> {
    return this.http.post<Game>(this.url + 'game', game);
  }

  updateGame(game: Game): Observable<Game> {
    return this.http.put<Game>(this.url + 'updateGame/' + game.id, game);
  }

  deleteGame(gameId: string): Observable<Game> {
    return this.http.delete<Game>(this.url + 'deleteGame/' + gameId);
  }
}
