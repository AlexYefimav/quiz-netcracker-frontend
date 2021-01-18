import {Component, Input, OnInit} from '@angular/core';
import {QuestionService} from "../service/question.service";
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
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

  deleteQuestion(id: string) {
    this.questionService.deleteQuestion(id).subscribe(question => this.question = question);
  }
}
