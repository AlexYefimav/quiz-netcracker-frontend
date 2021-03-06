import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from '../model/player';

@Injectable({
  providedIn: 'root',
})
export class GameAccessService {

  url = 'http://localhost:8443/game-access';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  sendActivateCode(gameId, playerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/sendActivateCode/' + gameId + '/' + playerId);
  }

  activateGameForPlayers(code: string): Observable<boolean> {
    console.log(code);
    return this.http.get<boolean>(this.url + '/activate/' + code);
  }

  deactivateGameForPlayers(gameId, playerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url + '/deactivate/' + gameId + '/' + playerId);
  }

  getPlayersWithTrueAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url + '/findPlayersWithTrueAccess/' + gameId);
  }

  getPlayersWithFalseAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url + '/findPlayersWithFalseAccess/' + gameId);
  }
}




