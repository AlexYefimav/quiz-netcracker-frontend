import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from "../model/player";

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

  getPlayersWithTrueAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url+'/findPlayersWithTrueAccess/'+gameId);
  }

  getPlayersWithFalseAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url+'/findPlayersWithFalseAccess/'+gameId);
  }
}




