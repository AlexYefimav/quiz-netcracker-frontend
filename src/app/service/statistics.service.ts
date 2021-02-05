import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from "rxjs";
import {Statistics} from "../model/statistics";
import {GameStatistics} from "../model/game-statistics";

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {

  url = 'http://127.0.0.1:8443/statistics/';

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  constructor(private http: HttpClient) {
  }

  getStatisticsPlayerIdAndByGameId(playerId: string, gameId: string): Observable<GameStatistics[]>{
    return this.http.get<GameStatistics[]>(this.url + playerId + "/" + gameId);
  }

  deleteStatistics(id: string): Observable<Statistics>{
    return this.http.delete<Statistics>(this.url + "delete/" + id);
  }

  getTotalPercentAllPlayers(): Observable<Map<string, number>>{
    return this.http.get<Map<string, number>>(this.url + "top");
  }
}
