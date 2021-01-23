import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Player} from '../model/player';
//import {Account} from '../../model/account';
import {HttpClient, HttpParams, HttpResponse} from '@angular/common/http';
//import {PageAccount} from '../../model/pageAccount';
//import {RegistrationDto} from '../../model/registration-dto';
import {PhotoDto} from '../model/photoDto';
import {User} from "../model/user";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private readonly clientUrl: string;

  constructor(private http: HttpClient) {
    this.clientUrl = '/users';
  }

  public getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.clientUrl}/finsUser/${id}`);
  }

  getUserByPlayerId(userId: string): Observable<Player> {
    return this.http.get<Player>( "/player/" + userId);
  }

  public changePhoto(formData: FormData): Observable<PhotoDto> {
    return this.http.post<PhotoDto>(`${this.clientUrl}/users/photo`, formData);
  }

}
