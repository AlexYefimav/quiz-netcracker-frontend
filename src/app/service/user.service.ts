import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams, HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  private readonly url: string;
 // url = 'http://localhost:8085/users/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.url = 'http://localhost:8085/';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users/findAllUsers");
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "users/findUser/" + userId);
  }

  // getUserByPlayerId(userId: string): Observable<User> {
  //   return this.http.get<User>(this.url + "player/" + userId);
  // }

  public getUserByLogin(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}users/player/${username}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/save", user)
  }

  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(this.url + "users/update/" + user.id, user);
  }

  deleteUser(userId: string): Observable<User> {
    console.log(userId);
    return this.http.delete<User>(this.url + "users/delete/" + userId);
  }

  public signIn(account: User): Observable<HttpResponse<User>> {
    account.username=account.login;
    console.log(account.login+account.password)
   return this.http.post<User>(this.url +"login", account, {observe: 'response', responseType: 'json'});
  }

}
