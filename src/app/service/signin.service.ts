import { Injectable } from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {catchError, delay} from "rxjs/operators";
import {Router} from "@angular/router";
import {Player} from "../model/player";

@Injectable({
  providedIn: 'root',
})
export class SigninService {

  url = 'http://localhost:8085/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router) {
  }

  register(user: User): Observable<User> {
    return this.http.post<User>(this.url +"users/register", user)
      // .pipe(
      //   delay(null),
      //   catchError(error => {
      //     this.router.navigate(['403']);
      //     return throwError(error)
      //   })
      // );
  }
  registerOnce(player: Player): Observable<Player> {
    return this.http.post<Player>(this.url +"player/register", player)
  }

}
