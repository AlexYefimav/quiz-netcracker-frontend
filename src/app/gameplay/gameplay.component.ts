import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {QuestionService} from "../service/question.service";
import {AnswerService} from "../service/answer.service";
import {Answer} from "../model/answer";
import {Game} from "../model/game";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-gameplay',
  templateUrl: './gameplay.component.html',
  styleUrls: ['./gameplay.component.css']
})
export class GameplayComponent implements OnInit {
  game: Game;
  questions: Question[];
  question: Question;
  answer: Answer = new Answer();
  favoriteAnswer: string;
  questionNumber: number = 1;
  check: boolean;
  //statistics: number = 0;


  constructor(private questionService: QuestionService,
              private answerService: AnswerService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.check = false;
    this.getQuestionList();
    this.question = this.questions[0];
  }

  private getQuestionList(): void {
    this.questions = this.activatedRoute.snapshot.data['question'];
  }

  getAnswerById(): void {
    this.answerService.getAnswer(this.favoriteAnswer).subscribe(answer=>{
      this.answer = answer;
    });
  }

  setQuestion() {
    this.question = this.questions[this.questionNumber];
    this.questionNumber++;
  }

  checkRight() {
    this.check = !this.check;
  }

  setAnswer(id: string) {
    this.favoriteAnswer = id;
  }
}
