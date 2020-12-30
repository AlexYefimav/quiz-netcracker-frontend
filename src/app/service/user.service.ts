import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {

  url = 'http://localhost:8085/users/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "findAllUsers");
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "findUser/" + userId);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "save", user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + "update/" + user.id, user);
  }

  deleteUser(userId: string): Observable<User> {
    console.log(userId);
    return this.http.delete<User>(this.url + "delete/" + userId);
  }
}
