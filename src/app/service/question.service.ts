import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Question} from "../model/question";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  url = 'http://127.0.0.1:8085/question/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getQuestion(): Observable<Question[]> {
    return this.http.get<Question[]>(this.url + "findAllQuestions");
  }

  getQuestionById(id: string): Observable<Question> {
    return this.http.get<Question>(this.url + "findQuestion/" + id);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.url + "save", question)
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.url + "update/" + question.id, question);
  }

  deleteQuestion(questionId: string): Observable<Question> {
    return this.http.delete<Question>(this.url + "delete/" + questionId);
  }
}
