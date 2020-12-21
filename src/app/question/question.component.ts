import {Component, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {Question} from "../model/question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions: Question[];
  public question: Question;


  constructor(private questionService: QuestionService) {
  }

  ngOnInit(): void {
    this.getQuestionList();
  }

  private getQuestionList(): void {
    this.questionService.getQuestion().subscribe(wrapper => {
      this.questions = wrapper.values;
    })
  }

  private getQuestion(questionId: string): void {
    this.questionService.getQuestionById(questionId).subscribe(question =>
      this.question = question);
  }

  private createQuestion(question: Question): void {
    this.questionService.createQuestion(question).subscribe(question => this.question = question);
  }
}
