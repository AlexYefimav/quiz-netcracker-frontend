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

  url = 'http://localhost:8085/player';

  constructor(private http: HttpClient) {
  }

  public getOnePlayer(id: string): Observable<Player> {
    return this.http.get<Player>(`${this.url}/id/${id}`);
  }

  public changePhoto(formData: FormData): Observable<PhotoDto> {
    return this.http.post<PhotoDto>(`${this.url}/users/photo`, formData);
  }

}
