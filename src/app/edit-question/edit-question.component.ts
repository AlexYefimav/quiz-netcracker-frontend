import { Component, OnInit } from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {

  question: Question;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {

  }

  ngOnInit(){
    this.getQuestion(this.route.snapshot.params.id);
  }

  private getQuestion(questionId: string): void {
    this.questionService.getQuestionById(questionId).subscribe(question =>
      this.question = question);
  }

  public updateQuestion(): void {
    // this.question.title = otherTitle;
    // this.question.description = otherDescription;
    // this.question.category = otherCategory;
    // this.question.level = otherLevel;
    this.questionService.updateQuestion(this.question).subscribe(question => this.question = question);
  }
}
