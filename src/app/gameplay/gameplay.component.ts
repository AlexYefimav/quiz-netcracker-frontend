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

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  webSocketAPI: WebSocketAPI;
  greeting: any;
  player: Player;
  gameRoomId: string;
  gameRoom: GameRoom;

  gameId: string; //id игры
  playerId: string; //id играющего
  questions: Question[]; //вопросы данной игры
  question: Question; //текущий вопрос
  answer: Answer = null; //ответ который дал игрок
  questionNumber: number = 0; //номер данного вопроса
  answeredQuestion: number = 0; //сколько вопросов ответил игрок
  check: boolean; //просто нужно (:
  progress: number; //тоже самое что и answeredQuestion только для mat-progress-bar
  endProgress: number; //всего количество вопросов
  quantityQuestion: number; //количество вопросов минус answeredQuestion
  isBlock: boolean;


  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute,
              private gameRoomService: GameRoomService) {
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
    this.endProgress = this.questions.length;
    for (let i = 0; i < this.quantityQuestion; i++) {
      this.questions[i].index = i;
    }
    this.isBlock = false;

    this.webSocketAPI = new WebSocketAPI(new GameplayComponent(
      this.questionService, this.answerService, this.statisticsService,
      this.storageService, this.playerService, this.route, this.gameRoomService),
      new StorageService(), this.player.id);
    this.connect();
  }

  private getGameRoom(): Promise<GameRoom>{
    return this.gameRoomService.getById(this.gameRoomId).toPromise();
  }

  private getQuestionList(id: string): Promise<Question[]> {
    return this.questionService.getQuestionByGameId(id).toPromise();
  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  async addAnswer() {
    this.answer = await this.getAnswerById(this.answer.id, this.playerId);
    this.incProgress();
    this.check = !this.check;
    this.questions.splice(this.questionNumber, 1);
    this.quantityQuestion = this.questions.length;
    console.log(this.questions);
    this.isBlock = true;

    this.sendMessage({
      name: this.player.name,
      right: this.answer.right,
      answer: this.answer.id,
      gameRoomId: this.gameRoomId,
      senderId: this.player.id
    });
  }

  getAnswerById(answerId: string, playerId: string): Promise<Answer> {
    return this.answerService.getAnswerAndSaveStatistics(answerId, playerId).toPromise();
  }

  setNextQuestion(next: boolean) {
    if (next) {
      this.check = !this.check;
      this.isBlock = false;
      if (this.questionNumber == this.quantityQuestion) {
        this.answer = null;
        this.setBackQuestion();
        return;
      }
    } else {
      this.questionNumber++;
    }
    this.question = this.questions[this.questionNumber];
    this.answer = null;
  }

  setBackQuestion() {
    this.questionNumber--;
    this.question = this.questions[this.questionNumber];
    console.log(this.question);
  }

  incProgress() {
    this.answeredQuestion++;
    this.progress = this.answeredQuestion / this.endProgress * 100;
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage(message) {
    this.webSocketAPI._send(message);
  }

  handleMessage(message) {
    alert(message.name);
  }
}
