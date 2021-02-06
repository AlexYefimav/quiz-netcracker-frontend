import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatisticsService} from "../service/statistics.service";
import {ActivatedRoute} from "@angular/router";
import {StorageService} from "../service/storage/storage.service";
import {Question} from "../model/question";
import {GameService} from "../service/game.service";
import {Game} from "../model/game";
import {GameStatistics} from "../model/game-statistics";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})

export class StatisticsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'title', 'yourAnswer', 'rightAnswer', 'percent'];
  private gameId: string;
  private playerId: string;
  statistics: GameStatistics[];
  game: Game;


  constructor(private statisticsService: StatisticsService,
              private storageService: StorageService,
              private gameService: GameService,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.playerId = this.route.snapshot.params.playerId;
    this.statistics = await this.getStatistics();
    for (let i = 0; i < this.statistics.length; i++) {
      this.statistics[i].index = i + 1;
    }
    this.game = await this.getGame();
  }


  async ngOnDestroy() {
    let player = await this.getPlayer();
    if(player.user==null){
      this.playerService.delete(this.playerId);
    }
  }

  getPlayer(): Promise<Player>{
    return this.playerService.getOnePlayer(this.playerId).toPromise();
  }

  getStatistics(): Promise<GameStatistics[]> {
    return this.statisticsService.getStatisticsPlayerIdAndByGameId(this.playerId, this.gameId).toPromise();
  }

  rightAnswer(question: Question) {
    for (let i = 0; i < question.answersSet.length; i++) {
      if (question.answersSet[i].right) {
        return question.answersSet[i].title;
      }
    }
  }

  getGame(): Promise<Game> {
    return this.gameService.getGameById(this.gameId).toPromise();
  }

  getAnswer(answer: any) {
    if (answer == null) {
      return "-";
    }
    return answer.title;
  }

  getColor(answer: any) {
    if (answer == null) {
      return "white";
    }
    if (answer.right) {
      return "green";
    }
    return "red";
  }
}
