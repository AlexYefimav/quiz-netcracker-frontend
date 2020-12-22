import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {WrapperForUser} from "../model/wrapperForUser";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  answerUrl = 'http://localhost:8085/users';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<WrapperForUser> {
    return this.http.get<WrapperForUser>(this.answerUrl + '/findAllUsers');
  }
}
