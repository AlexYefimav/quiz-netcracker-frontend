import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {GameCategory} from '../model/game-category';

@Injectable({
  providedIn: 'root',
})
export class GameCategoryService {

  url = 'http://127.0.0.1:8443/gameCategory/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getGameCategories(): Observable<GameCategory[]> {
    return this.http.get<GameCategory[]>(this.url);
  }

  getGameCategoryById(id: string): Observable<GameCategory> {
    return this.http.get<GameCategory>(this.url + id)
  }
}
