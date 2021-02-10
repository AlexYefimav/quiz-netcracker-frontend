import {Component, Injector, OnDestroy, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {QuestionService} from '../service/question.service';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {ActivatedRoute, Router} from '@angular/router';
import {StatisticsService} from '../service/statistics.service';
import {StorageService} from '../service/storage/storage.service';
import {WebSocketAPI} from '../webSocket/web-socket-api';
import {Player} from '../model/player';
import {PlayerService} from '../service/player.service';
import {GameRoom} from '../model/game-room';
import {GameRoomService} from '../service/game-room.service';
import {Playing} from '../model/playing';
import {MatSnackBar} from '@angular/material/snack-bar';
import {GameService} from '../service/game.service';
import {CountdownEvent} from 'ngx-countdown';
import {TranslateService} from '@ngx-translate/core';
import {Game} from '../model/game';
import {Observable} from 'rxjs/internal/Observable';

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css', '../app.component.css']
})
export class MultiplayerComponent implements OnInit, OnDestroy {
  private webSocketAPI: WebSocketAPI; //веб сокет для передачи инфы

  player: Player; // игрок
  players: Playing[] = []; // все игроки
  private gameRoomId: string; // id игровой комнаты
  private gameRoom: GameRoom; // игровая комната

  game: Game; // игра
  private questions: Question[] = []; //вопросы данной игры
  question: Question; //текущий вопрос
  answer: Answer = null; //ответ который дал игрок
  questionNumber: number = 0; //номер данного вопроса
  answeredQuestion: number = 0; //сколько вопросов ответил игрок

  index: number[] = []; //для нумерации вопросов

  quantityQuestion: number; //количество вопросов
  isBlockAnswers: boolean; //для блокирования ответов

  timeIsOver: boolean = false; //конец таймера(при true таймер 0)
  private answerButtonNotPressed: boolean = false; // когда кнопка "ответить" не была нажата

  isLoading = true;
  isDestroy = true;

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute,
              private gameRoomService: GameRoomService,
              private _snackBar: MatSnackBar,
              private gameService: GameService,
              private injector: Injector,
              private router: Router) {
  }

  ngOnInit(): void {
    this.isBlockAnswers = false;
    this.timeIsOver = false;
    this.gameRoomId = this.route.snapshot.params.gameRoomId;
    this.playerService.getOnePlayer(this.route.snapshot.params.playerId).subscribe(player => {
      this.player = player;
      this.webSocketAPI = new WebSocketAPI(this, this.player);
      this.connect();
      this.questionService.getQuestionByGameId(this.route.snapshot.params.gameId).subscribe(questions => {
        this.questions = questions;
        this.question = this.questions[this.questionNumber];
        this.quantityQuestion = this.questions.length;
        for (let i = 0; i < this.quantityQuestion; i++) {
          this.index.push(i);
        }
        this.gameRoomService.getById(this.gameRoomId).subscribe(gameRoom => {
          this.gameRoom = gameRoom;
          for (let i = 0; i < this.gameRoom.players.length; i++) {
            this.players[i] = {
              player: this.gameRoom.players[i],
              answerColor: this.setColor()
            }
          }
          this.gameService.getShortGameById(this.route.snapshot.params.gameId).subscribe(game => {
            this.game = game;
            this.isLoading = false;
          });
        });
      });
    });
  }

  getAnswerById(): Observable<Answer> {
    if (this.answer == null) {
      return this.answerService.getAnswerAndSaveStatistics(this.question.id, "null", this.player.id, this.gameRoomId, this.questionNumber);
    }
    return this.answerService.getAnswerAndSaveStatistics(this.question.id, this.answer.id, this.player.id, this.gameRoomId, this.questionNumber);
  }

  setNextQuestion(): void {
    this.isBlockAnswers = false;
    this.timeIsOver = false;
    this.answerButtonNotPressed = false;
    this.questionNumber++;
    this.question = this.questions[this.questionNumber];
    this.answer = null;
  }

  private setColor(): string[] {
    let color: string[] = [];
    for (let i = 0; i < this.quantityQuestion; i++) {
      color.push("gray");
    }
    return color;
  }

  addAnswer(): void {
    this.isBlockAnswers = true;
    this.answerButtonNotPressed = true;
  }

  connect(): void {
    this.webSocketAPI._connect();
  }

  disconnect(): void {
    this.gameRoomService.deletePlayer(this.gameRoom.id, this.player.id).subscribe(gameRoom => {
      this.gameRoom = gameRoom;
      this.webSocketAPI.sendPlayerExited(this.gameRoom);
      this.webSocketAPI._disconnect();
    });
  }

  sendLikePlayer(player: Player) {
    let message = {
      name: this.player.login,
      recipientId: player.id,
      gameRoomId: this.gameRoomId
    }
    this.webSocketAPI.sendLikePlayer(message);
  }

  handleMessage(message) {
    if (message.playerId == undefined) {
      const translateService = this.injector.get(TranslateService);
      let mes, action;
      translateService.stream('SNACKBAR_LIKE').subscribe(value => {
        mes = value.MESSAGE + message;
        action = value.ACTION;
        this.openSnackBar(mes, action);
      });
    } else {
      const idx = this.players.findIndex(p => p.player.id == message.playerId);
      if (message.right) {
        this.players[idx].answerColor[message.numberAnswer] = "green";
      } else {
        this.players[idx].answerColor[message.numberAnswer] = "red";
      }
    }
  }

  openSnackBar(message, action: string): void {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  isDisabled(): boolean {
    return this.timeIsOver || this.isBlockAnswers;
  }

  timerEvent($event: CountdownEvent): void {
    if ($event.left == 0) {
      this.timeIsOver = true;
      this.answeredQuestion++;
      this.getAnswerById().subscribe(answer => {
        this.answer = answer;
        if (answer == null || !this.answerButtonNotPressed) {
          return;
        }
        const idx = this.players.findIndex(p => p.player.id == this.player.id);
        if (answer.right) {
          this.players[idx].answerColor[this.questionNumber] = "green";
        } else {
          this.players[idx].answerColor[this.questionNumber] = "red";
        }
      });
    }
  }

  redirect(url: string) {
    this.router.navigate([url + this.game.id + '/' + this.player.id]);
    this.isDestroy = false;
  }

  ngOnDestroy(): void {
    if (this.isDestroy) {
      this.statisticsService.deleteStatistics(this.player.id, this.game.id).subscribe(() => {
        this.playerService.getOnePlayer(this.player.id).subscribe(player => {
          if (player.user == null) {
            this.playerService.delete(player.id).subscribe();
            this.disconnect();
          }
        })
      });
    }
  }
}
