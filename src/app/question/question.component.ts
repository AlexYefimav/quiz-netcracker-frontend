import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {QuestionService} from '../service/question.service';
import {Question} from '../model/question';
import {Game} from '../model/game';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() game: Game;

  public questions: Question[];
  public question: Question;

  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.questionService.getQuestion().subscribe(questions => {
      this.questions = questions;
    });
  }

  deleteQuestion(question: Question): void {
    const questions = this.game.questions;
    const chosenQuestionIndex = questions.indexOf(question);
    if (chosenQuestionIndex !== -1) {
      questions.splice(chosenQuestionIndex, 1);
    }
  }
}
