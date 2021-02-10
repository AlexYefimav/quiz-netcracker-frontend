import {Component, OnDestroy, OnInit} from '@angular/core';
import {StatisticsService} from '../service/statistics.service';
import {ActivatedRoute} from '@angular/router';
import {StorageService} from '../service/storage/storage.service';
import {Question} from '../model/question';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {GameStatistics} from '../model/game-statistics';
import {PlayerService} from '../service/player.service';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css', '../app.component.css']
})

export class StatisticsComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['position', 'title', 'yourAnswer', 'rightAnswer', 'percent'];
  private gameId: string;
  private playerId: string;
  statistics: GameStatistics[];
  game: Game;
  isLoading = true;


  constructor(private statisticsService: StatisticsService,
              private storageService: StorageService,
              private gameService: GameService,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.gameId = this.route.snapshot.params.gameId;
    this.playerId = this.route.snapshot.params.playerId;
    this.statisticsService.getStatisticsPlayerIdAndByGameId(this.playerId, this.gameId).subscribe(statistics => {
      this.statistics = statistics;
      for (let i = 0; i < this.statistics.length; i++) {
        this.statistics[i].index = i + 1;
      }
      this.gameService.getGameById(this.gameId).subscribe(game => {
        this.game = game;
        this.isLoading = false;
      });
    });
  }

  rightAnswer(question: Question) {
    for (let i = 0; i < question.answersSet.length; i++) {
      if (question.answersSet[i].right) {
        return question.answersSet[i].title;
      }
    }
  }

  getAnswer(answer: any) {
    if (answer == null) {
      return "-";
    }
    return answer.title;
  }

  getColor(answer: any) {
    if (answer == null) {
      return "black";
    }
    if (answer.right) {
      return "green";
    }
    return "red";
  }

  ngOnDestroy(): void {
    this.playerService.getOnePlayer(this.playerId).subscribe(player => {
      if (player.user == null) {
        this.statisticsService.deleteStatistics(this.playerId, this.gameId).subscribe(()=>{
          this.playerService.delete(player.id).subscribe();
        });
      }
    })
  }
}
