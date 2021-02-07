import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../model/player';
import {HttpClient} from '@angular/common/http';
import {Photo} from "../model/photo";
import {Game} from "../model/game";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url = 'http://localhost:8443/player';

  constructor(private http: HttpClient) {
  }

  public getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.url}/id/${id}`);
  }

  public getPlayerByUserId(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.url}/userId/${id}`);
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(this.url + "/update/" + player.id, player);
  }

  uploadFile(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.url + '/uploadFile', formData);
  }

  updateFile(id: string, formData: FormData): Observable<Game> {
    return this.http.post<Game>(this.url + '/updateFile/' + id, formData);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.url);
  }

  getPlayersByAccess(): Observable<Player[]> {
    return this.http.get<Player[]>(this.url);
  }

  saveGuest(login: string): Observable<Player> {
    return this.http.post<Player>(this.url + "/register-guest", login);
  }

  getGuest(name: string): Observable<Player> {
    return this.http.get<Player>(this.url + "/guest/" + name);
  }

  delete(id: string): Observable<Player> {
    return this.http.delete<Player>(this.url + '/delete/' + id);
  }
}
