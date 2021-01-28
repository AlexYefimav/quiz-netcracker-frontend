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

@Component({
  selector: 'app-multiplayer',
  templateUrl: './multiplayer.component.html',
  styleUrls: ['./multiplayer.component.css']
})
export class MultiplayerComponent implements OnInit {
  webSocketAPI: WebSocketAPI; //веб сокет для передачи инфы

  player: Player; // игрок
  players: Playing[] = []; //игроки играющие против player-а
  gameRoomId: string; // id игровой комнаты
  gameRoom: GameRoom; // игровая комната

  gameId: string; //id игры
  playerId: string; //id играющего
  questions: Question[] = []; //вопросы данной игры
  question: Question; //текущий вопрос
  answer: Answer = null; //ответ который дал игрок
  questionNumber: number = 0; //номер данного вопроса
  answeredQuestion: number = 0; //сколько вопросов ответил игрок

  index: number[] = []; //для нумерации вопросов

  quantityQuestion: number; //количество вопросов
  isBlockAnswers: boolean; //для блокирования ответов

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute,
              private gameRoomService: GameRoomService,
              private _snackBar: MatSnackBar) {
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.gameRoomId = this.route.snapshot.params.gameRoomId;
    this.playerId = this.storageService.currentUser.id;

    this.player = await this.getPlayer(this.playerId);
    this.gameRoom = await this.getGameRoom();
    this.questions = await this.getQuestionList(this.gameId);

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
  }

  private setColor(): string[] {
    let color: string[] = [];
    for (let i = 0; i < this.quantityQuestion; i++) {
      color.push("gray");
    }
    return color;
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

  async addAnswer() {
    this.answer = await this.getAnswerById();

    this.answeredQuestion++;

    for (let i = 0; i < this.players.length; i++) {
      if (this.player.id == this.players[i].player.id) {
        if (this.answer.right) {
          this.players[i].answerColor[this.questionNumber] = "green";
        } else {
          this.players[i].answerColor[this.questionNumber] = "red";
        }
      }
    }

    this.isBlockAnswers = true;
  }

  getAnswerById(): Promise<Answer> {
    return this.answerService.getAnswerAndSaveStatistics(this.answer.id, this.player.id, this.gameRoomId, this.questionNumber).toPromise();
  }

  setNextQuestion() {
    this.isBlockAnswers = false;
    this.questionNumber++;
    this.question = this.questions[this.questionNumber];
    this.answer = null;
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

  handleMessage(message) {
    if (message.playerId == undefined) {
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

  openSnackBar(message, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
