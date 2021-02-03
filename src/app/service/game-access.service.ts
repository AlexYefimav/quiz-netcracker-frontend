import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GameAccessService {

  url = 'http://localhost:8085/game-access';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getGameAccessByGameAndPlayer(gameId,playerId: string): Observable<boolean> {
       return this.http.get<boolean>(this.url+'/check/' + gameId+'/'+playerId);
  }

  activateGameForPlayers(gameId,playerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url+'/activate/' + gameId+'/'+playerId);
  }
}




