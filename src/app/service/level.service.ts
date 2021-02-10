import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Level} from '../model/level';

@Injectable({
  providedIn: 'root',
})
export class LevelService {

  url = 'http://127.0.0.1:8443/level/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getLevels(): Observable<Level[]> {
    return this.http.get<Level[]>(this.url);
  }
}
