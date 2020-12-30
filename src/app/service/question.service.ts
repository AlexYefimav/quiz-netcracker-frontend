import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Wrapper} from "../model/wrapper";
import {Question} from "../model/question";
import {User} from "../model/user";

@Injectable({
  providedIn: 'root',
})
export class QuestionService {

  url = 'http://127.0.0.1:8080/question/';


  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }


  getQuestion(): Observable<Wrapper> {
    return this.http.get<Wrapper>(this.url + "findAllQuestions");
  }

  getQuestionById(questionId: string): Observable<Question> {
    return this.http.get<Question>(this.url + "findQuestion/" + questionId);
  }

  createQuestion(question: Question): Observable<Question> {
    return this.http.post<Question>(this.url + "save", question)
  }

  updateQuestion(question: Question): Observable<Question> {
    return this.http.put<Question>(this.url + "update/" + question.id, question);
  }

  deleteQuestion(questionId: string) {
    return this.http.delete<Question>(this.url + "delete/" + questionId);
  }
}
