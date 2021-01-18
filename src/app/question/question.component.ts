import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {Question} from "../model/question";
import {Game} from '../model/game';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @Input() game: Game;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
  }

  deleteQuestion(question: Question): void {
    const questions = this.game.questions;
    const chosenQuestionIndex = questions.indexOf(question);
    if (chosenQuestionIndex !== -1) {
      questions.splice(chosenQuestionIndex, 1);
    }
  }
}
