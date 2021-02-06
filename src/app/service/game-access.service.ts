import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Player} from "../model/player";
import {GameAccess} from "../model/game-access";

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

  checkGameAccessByGameAndPlayer(gameId,playerId: string): Observable<boolean> {
       return this.http.get<boolean>(this.url+'/check/' + gameId+'/'+playerId);
  }

  getGameAccessByGameAndPlayer(gameId,playerId: string): Observable<GameAccess> {
   // return this.http.get<GameAccess>(this.url+'/' + gameId+'/'+playerId);
    window.alert("ddd"+gameId+" "+playerId);
    return this.http.get<GameAccess>('http://localhost:8443/game-access/353a7c22-28ef-4d43-b03d-f9a02c4d3e81/b2f3c218-8ac8-41c6-b136-ab4ce8005338');
  }

  sendActivateCode(gameId,playerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url+'/sendActivateCode/' + gameId+'/'+playerId);
  }

  activateGameForPlayers(code: string): Observable<boolean> {
    console.log(code);
    return this.http.get<boolean>(this.url+'/activate/' +code);
  }

  deactivateGameForPlayers(gameId,playerId: string): Observable<boolean> {
    return this.http.get<boolean>(this.url+'/deactivate/' + gameId+'/'+playerId);
  }

  getPlayersWithTrueAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url+'/findPlayersWithTrueAccess/'+gameId);
  }

  getPlayersWithFalseAccess(gameId: string): Observable<Player[]> {
    return this.http.get<Player[]>(this.url+'/findPlayersWithFalseAccess/'+gameId);
  }
}




