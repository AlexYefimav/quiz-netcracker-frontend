import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Answer} from '../model/answer';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private answerUrl = 'http://localhost:8443/answer';
  private httpOptions = {
    headers: new HttpHeaders({
      Accept: 'application/json',
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAnswers(): Observable<Answer[]> {
    return this.http.get<Answer[]>(this.answerUrl + '/all');
  }

  getAnswerAndSaveStatistics(questionId: string, answerId: string, playerId: string, gameRoomId: string, numberAnswer: number): Observable<Answer> {
    const resultUrl = `${this.answerUrl}/${questionId}/${answerId}/${playerId}/${gameRoomId}/${numberAnswer}`;
    return this.http.get<Answer>(resultUrl);
  }

  getAnswer(id: string): Observable<Answer> {
    return this.http.get<Answer>(this.answerUrl + "/" + id);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    const resultUrl = this.answerUrl + `/${answer.id}`;
    return this.http.put<Answer>(resultUrl, answer, this.httpOptions);
  }
}
