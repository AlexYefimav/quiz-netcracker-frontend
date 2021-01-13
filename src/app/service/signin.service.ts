import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SigninService {

  url = 'http://localhost:8085/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  register(user: User): Observable<User> {
    console.log(user.login);
    return this.http.post<User>(this.url +"users/register", user)
  }

  signIn(user: User): Observable<User> {
    return this.http.post<User>(this.url + "login", user)
  }
}
