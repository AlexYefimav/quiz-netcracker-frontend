import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from "rxjs";
import {Wrapper} from "../model/wrapper";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
  }


  getQuestion(): Observable<Wrapper> {
    return this.http.get<Wrapper>('http://127.0.0.1:8085/question/findAllQuestions');
  }
}
