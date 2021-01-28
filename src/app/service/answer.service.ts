import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Answer} from '../model/answer';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {

  private answerUrl = 'http://localhost:8085/answer';
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

  getAnswerAndSaveStatistics(answerId: string, playerId: string, gameRoomId: string, numberAnswer: number): Observable<Answer> {
    const resultUrl = `${this.answerUrl}/${answerId}/${playerId}/${gameRoomId}/${numberAnswer}`;
    return this.http.get<Answer>(resultUrl);
  }

  getAnswer(id: string): Observable<Answer> {
    return this.http.get<Answer>(this.answerUrl + "/" + id);
  }

  addAnswer(answer: Answer): Observable<Answer> {
    const resultUrl = this.answerUrl + '/answer';
    return this.http.post<Answer>(resultUrl, answer, this.httpOptions);
  }

  updateAnswer(answer: Answer): Observable<Answer> {
    const resultUrl = this.answerUrl + `/${answer.id}`;
    return this.http.put<Answer>(resultUrl, answer, this.httpOptions);
  }

  deleteAnswer(answer: Answer): Observable<any> {
    const resultUrl = `${this.answerUrl}/${answer.id}`;

    return this.http.delete(resultUrl, this.httpOptions);
  }
}
