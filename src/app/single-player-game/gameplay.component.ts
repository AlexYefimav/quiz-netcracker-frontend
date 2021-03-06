import {Component, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {QuestionService} from '../service/question.service';
import {AnswerService} from '../service/answer.service';
import {Answer} from '../model/answer';
import {ActivatedRoute} from '@angular/router';
import {StatisticsService} from '../service/statistics.service';
import {StorageService} from '../service/storage/storage.service';
import {Player} from '../model/player';
import {PlayerService} from '../service/player.service';

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css', '../app.component.css']
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
  isLoading = true;

  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private statisticsService: StatisticsService,
              private storageService: StorageService,
              private playerService: PlayerService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    this.gameId = this.route.snapshot.params.gameId;
    this.questionService.getQuestionByGameId(this.gameId).subscribe(questions => {
      this.questions = questions;
      this.question = this.questions[this.questionNumber];
      this.quantityQuestion = this.questions.length;

      for (let i = 0; i < this.quantityQuestion; i++) {
        this.index.push(i);
      }
      this.isBlockAnswers = false;
      this.isLoading = false;
    });
  }

  addAnswer() {
    this.isLoading = true;
    this.answerService.getAnswer(this.answer.id).subscribe(answer => {
      this.answer = answer;
      this.incProgress();

      this.questions.splice(this.questionNumber, 1);
      this.quantityQuestion = this.questions.length;

      this.isBlockAnswers = true;
      this.isLoading = false;
    });
  }

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
