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
    this.url = 'http://localhost:8085/users/';
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "findAllUsers");
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "findUser/" + userId);
  }

  public getUserByLogin(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}users/${username}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "save", user)
  }

  updateUser(user: User): Observable<User> {
    console.log(user);
    return this.http.put<User>(this.url + "update/" + user.id, user);
  }

  deleteUser(userId: string): Observable<User> {
    console.log(userId);
    return this.http.delete<User>(this.url + "delete/" + userId);
  }

  public loginClient(account: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(`${this.url}login`, account, {observe: 'response', responseType: 'json'});
  }

  public confirmAccount(token: string): Observable<any> {
    return this.http.post(`${this.url}confirm-account?token=${token}`, {observe: 'response', responseType: 'json'});
  }

  public signUp(user: User): Observable<User> {
    return this.http.post<User>(this.url +"register", user);
  }

}
