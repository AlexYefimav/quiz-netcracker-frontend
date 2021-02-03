import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";
import {AnswerService} from "../service/answer.service";
import {Answer} from "../model/answer";
import {ActivatedRoute} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {StorageService} from "../service/storage/storage.service";
import {WebSocketAPI} from "../webSocket/web-socket-api";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";
import {GameRoom} from "../model/game-room";
import {GameRoomService} from "../service/game-room.service";
import {Playing} from "../model/playing";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Game} from "../model/game";
import {GameService} from "../service/game.service";

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {
  private webSocketAPI: WebSocketAPI; //веб сокет для передачи инфы

  player: Player; // игрок
  players: Playing[] = []; //игроки играющие против player-а
  private gameRoomId: string; // id игровой комнаты
  private gameRoom: GameRoom; // игровая комната

  gameId: string; //id игры
  game: Game;
  private playerId: string; //id играющего
  private questions: Question[] = []; //вопросы данной игры
  question: Question; //текущий вопрос
  answer: Answer = null; //ответ который дал игрок
  questionNumber: number = 0; //номер данного вопроса
  answeredQuestion: number = 0; //сколько вопросов ответил игрок

  index: number[] = []; //для нумерации вопросов

  quantityQuestion: number; //количество вопросов
  isBlockAnswers: boolean; //для блокирования ответов

  count: number = 30; //счетчик
  timeIsOver: boolean = false;
  private answerButtonNotPressed: boolean = false;

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute,
              private gameRoomService: GameRoomService,
              private _snackBar: MatSnackBar,
              private gameService: GameService) {
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.gameRoomId = this.route.snapshot.params.gameRoomId;
    this.playerId = this.storageService.currentUser.id;

    this.player = await this.getPlayer(this.playerId);
    this.gameRoom = await this.getGameRoom();
    this.questions = await this.getQuestionList(this.gameId);
    this.game = await this.getGameById();

    this.question = this.questions[this.questionNumber];
    this.quantityQuestion = this.questions.length;
    this.isBlockAnswers = false;

    for (let i = 0; i < this.quantityQuestion; i++) {
      this.index.push(i);
    }

    for (let i = 0; i < this.gameRoom.players.length; i++) {
      this.players[i] = {
        player: this.gameRoom.players[i],
        answerColor: this.setColor()
      }
    }

    this.webSocketAPI = new WebSocketAPI(this, this.player, this.gameRoomId, this.gameRoomService);
    this.connect();

    await this.delay();
    this.timeIsOver = true;
  }

  private getGameById(): Promise<Game> {
    return this.gameService.getGameById(this.gameId).toPromise()
  }

  private getGameRoom(): Promise<GameRoom> {
    return this.gameRoomService.getById(this.gameRoomId).toPromise();
  }

  private getQuestionList(id: string): Promise<Question[]> {
    return this.questionService.getQuestionByGameId(id).toPromise();
  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  getAnswerById(): Promise<Answer> {
    return this.answerService.getAnswerAndSaveStatistics(this.answer.id, this.player.id, this.gameRoomId, this.questionNumber).toPromise();
  }

  setNextQuestion() {
    this.webSocketAPI.sendNextQuestion(this.gameRoom);
  }

  private setColor(): string[] {
    let color: string[] = [];
    for (let i = 0; i < this.quantityQuestion; i++) {
      color.push("gray");
    }
    return color;
  }

  async addAnswer() {
    this.isBlockAnswers = true;
    this.answerButtonNotPressed = true;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage(player: Player) {
    let message = {
      name: this.player.name,
      recipientId: player.id,
      gameRoomId: this.gameRoomId
    }
    this.webSocketAPI.sendGameMessage(message);
  }

  async handleMessage(message) {
    if (message == "next") {
      this.isBlockAnswers = false;
      this.timeIsOver = false;
      this.answerButtonNotPressed = false;
      this.questionNumber++;
      this.question = this.questions[this.questionNumber];
      this.answer = null;
      this.count = 30;
      await this.delay();
      this.timeIsOver = true;
    } else if (message.playerId == undefined) {
      this.openSnackBar(message, "Like");
    } else {
      for (let i = 0; i < this.players.length; i++) {
        if (message.playerId == this.players[i].player.id) {
          if (message.right) {
            this.players[i].answerColor[message.numberAnswer] = "green";
          } else {
            this.players[i].answerColor[message.numberAnswer] = "red";
          }
        }
      }
    }
  }

  async delay() {
    for (let i = 0; i < 30; i++) {
      await new Promise(resolve => setTimeout(() => resolve(), 1000));
      this.count--;
    }
    this.answeredQuestion++;
    if (this.answer == null || !this.answerButtonNotPressed) {
      return;
    }
    this.answer = await this.getAnswerById();

    for (let i = 0; i < this.players.length; i++) {
      if (this.player.id == this.players[i].player.id) {
        if (this.answer.right) {
          this.players[i].answerColor[this.questionNumber] = "green";
        } else {
          this.players[i].answerColor[this.questionNumber] = "red";
        }
      }
    }
  }

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  isDisabled() {
    return this.timeIsOver || this.isBlockAnswers;
  }
}