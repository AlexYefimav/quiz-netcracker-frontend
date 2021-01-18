import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {Game} from '../model/game';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() game: Game;
  public questions: Question[];
  public question: Question;


  constructor(private questionService: QuestionService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getQuestionList();
  }

  private getQuestionList(): void {
    this.questions = this.activatedRoute.snapshot.data['question'];
  }

  deleteQuestion(question: Question): void {
    const questions = this.game.questions;
    const chosenQuestionIndex = questions.indexOf(question);
    if (chosenQuestionIndex !== -1) {
      questions.splice(chosenQuestionIndex, 1);
    }
  }
}
