import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {Player} from '../model/player';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
import {Photo} from "../photo";
import {Game} from "../model/game";
import {User} from "../model/user";
import {catchError, delay} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  url = 'http://localhost:8085/player';

  constructor(private http: HttpClient) {
  }

  public getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.url}/id/${id}`);
  }

  updatePlayer(player: Player): Observable<Player> {
    return this.http.put<Player>(this.url + "/update/" + player.id, player);
  }

  uploadFile(formData: FormData): Observable<Photo> {
    return this.http.post<Photo>(this.url + '/uploadFile', formData);
  }

  updateFile(id: string, formData: FormData): Observable<Game>{
    return this.http.post<Game>(this.url + '/updateFile/' + id, formData);
  }

  getPlayers(): Observable<Player[]> {
    return this.http.get<Player[]>(this.url);
  }

}
