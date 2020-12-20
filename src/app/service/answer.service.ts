import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Answer} from '../model/answer';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  httpOptions = {
    header: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  answerUrl = 'http://localhost:8080/answer';

  constructor(private http: HttpClient) { }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answerUrl + '/all');
  }
}
