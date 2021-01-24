import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, delay} from "rxjs/operators";
import {Router} from '@angular/router';
import {StorageService} from "./storage.service";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  url = 'http://localhost:8085/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router,private storageService: StorageService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users/findAllUsers")
 //  return this.http.get<User[]>(this.url + "users/findAllUsers", {observe: 'response', responseType: 'json'})
      .pipe(
        delay(403),
        catchError(error => {
            this.router.navigate(['403']);
          return throwError(error)
        })
      );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "users/findUser/" + userId);
  }


  getUserByLogin(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}users/${username}`);
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
   return this.http.post<User>(this.url +"login", account, {observe: 'response', responseType: 'json'});
  }

}
