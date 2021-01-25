import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../model/player';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';

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
}
