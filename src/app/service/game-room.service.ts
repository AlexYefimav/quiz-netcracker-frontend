import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameRoom} from '../model/game-room';

@Injectable({
  providedIn: 'root',
})
export class GameRoomService {

  url = 'http://127.0.0.1:8443/game-room/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  findGameRoom(gameId: string, playerId: string): Observable<GameRoom> {
    return this.http.get<GameRoom>(this.url + gameId + "/" + playerId)
  }

  getById(id: string): Observable<GameRoom> {
    return this.http.get<GameRoom>(this.url + id);
  }

  delete(id: string): Observable<GameRoom> {
    return this.http.delete<GameRoom>(this.url + "delete/" + id);
  }

  deletePlayer(gameRoomId: string, playerId: string): Observable<GameRoom> {
    return this.http.delete<GameRoom>(this.url + gameRoomId + "/" + playerId);
  }
}
