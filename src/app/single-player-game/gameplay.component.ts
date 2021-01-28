import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";
import {AnswerService} from "../service/answer.service";
import {Answer} from "../model/answer";
import {ActivatedRoute} from "@angular/router";
import {StatisticsService} from "../service/statistics.service";
import {StorageService} from "../service/storage/storage.service";
import {Player} from "../model/player";
import {PlayerService} from "../service/player.service";

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  player: Player;

  gameId: string; //id игры
  playerId: string; //id играющего
  questions: Question[]; //вопросы данной игры
  question: Question; //текущий вопрос
  answer: Answer = null; //ответ который дал игрок
  questionNumber: number = 0; //номер данного вопроса
  answeredQuestion: number = 0; //сколько вопросов ответил игрок

  progress: number; //тоже самое что и answeredQuestion только для mat-progress-bar

  quantityQuestion: number; //количество вопросов минус answeredQuestion
  isBlockAnswers: boolean;

  index: number[] = []; //для нумерации вопросов

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.playerId = this.storageService.currentUser.id;

    this.player = await this.getPlayer(this.playerId);
    this.questions = await this.getQuestionList(this.gameId);

    this.question = this.questions[this.questionNumber];
    this.quantityQuestion = this.questions.length;

    for (let i = 0; i < this.quantityQuestion; i++) {
      this.index.push(i);
    }
    this.isBlockAnswers = false;
  }

  private getQuestionList(id: string): Promise<Question[]> {
    return this.questionService.getQuestionByGameId(id).toPromise();
  }

  getPlayer(playerId: string): Promise<Player> {
    return this.playerService.getOnePlayer(playerId).toPromise();
  }

  async addAnswer() {
    // this.answer = await this.getAnswerById(this.answer.id, this.playerId, this.gameRoomId);
    this.incProgress();

    this.questions.splice(this.questionNumber, 1);
    this.quantityQuestion = this.questions.length;

    this.isBlockAnswers = true;
  }

  // getAnswerById(answerId: string, playerId: string): Promise<Answer> {
  //   return this.answerService.getAnswerAndSaveStatistics(answerId, playerId).toPromise();
  // }

  setNextQuestion(next: boolean) {
    if (next) {
      this.isBlockAnswers = false;
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
  }

  incProgress() {
    this.answeredQuestion++;
    this.progress = this.answeredQuestion / this.index.length * 100;
  }
}
