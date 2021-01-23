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

  public questions: Question[];
  public question: Question;


  constructor(private questionService: QuestionService) {
  }

  async ngOnInit() {
    this.questions = await this.getQuestionList();
  }

  private getQuestionList(): Promise<Question[]> {
    return this.questionService.getQuestion().toPromise();
  }

  deleteQuestion(question: Question): void {
    const questions = this.game.questions;
    const chosenQuestionIndex = questions.indexOf(question);
    if (chosenQuestionIndex !== -1) {
      questions.splice(chosenQuestionIndex, 1);
    }
  }
}
