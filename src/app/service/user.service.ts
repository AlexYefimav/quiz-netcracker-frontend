import {Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {User} from '../model/user';
import {HttpClient, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {catchError, delay} from 'rxjs/operators';
import {Router} from '@angular/router';
import {StorageService} from './storage/storage.service';
import {ActivateCode} from '../model/activate-code';
import {Message} from '../model/message';
import {Game} from "../model/game";

@Injectable({
  providedIn: 'root',
})
export class UserService {

  url = 'http://localhost:8443/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient, private router: Router, private storageService: StorageService) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users/findAllUsers")
  }

  checkUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url + "users/checkAllUsers")
      .pipe(
        delay(403),
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error);
        })
      );
  }

  getUserById(userId: string): Observable<User> {
    return this.http.get<User>(this.url + "users/findUser/" + userId);
  }

  getUserByLoginOrEmail(username: string): Observable<User> {
    return this.http.get<User>(`${this.url}users/${username}`);
  }

  createUser(user: User): Observable<User> {
    return this.http.post<User>(this.url + "users/save", user)
  }

  updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.url + "users/update/" + user.id, user)
      .pipe(
        delay(403),
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error)
        })
      );
  }

  deleteUser(userId: string): Observable<User> {
    return this.http.delete<User>(this.url + "users/delete/" + userId)
      .pipe(
        delay(403),
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error);
        })
      );
  }

  blockUser(userId: string): Observable<User> {
    return this.http.post<User>(this.url + "users/block/" + userId, userId)
      .pipe(
        delay(403),
        catchError(error => {
          this.router.navigate(['403']);
          return throwError(error);
        })
      );
  }

  signIn(account: User): Observable<HttpResponse<User>> {
    return this.http.post<User>(this.url + "login", account, {observe: 'response', responseType: 'json'});
  }

  activate(mail: string, code: string): Observable<ActivateCode> {
    return this.http.get<ActivateCode>(this.url + "users/activate/" + mail + "/" + code);
  }

  getPageableUsers(pageNumber: number,
                   pageSize: number): Observable<Message> {
    // Initialize Params Object
    let params = new HttpParams();

    // Begin assigning parameters
    params = params.append('page', pageNumber.toString());
    params = params.append('size', pageSize.toString());

    return this.http.get<Message>(this.url + `users/pageable`, {params: params});
  }

  activateAccount(code: string): Observable<ActivateCode> {
    return this.http.get<ActivateCode>(this.url + "users/activate/" + code);
  }

}
