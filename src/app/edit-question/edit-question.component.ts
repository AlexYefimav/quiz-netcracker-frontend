import { Component, OnInit, ViewChild } from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  question: Question;
  isUpdateQuestion:boolean;

  constructor(private questionService: QuestionService, private route: ActivatedRoute) {

  }

  ngOnInit(){
    if(this.route.snapshot.params.id!=null){
      this.isUpdateQuestion = true;
      this.getQuestion(this.route.snapshot.params.id);
    } else {
      this.isUpdateQuestion = false;
      this.question = new Question();
    }

  }

  private getQuestion(questionId: string): void {
    this.questionService.getQuestionById(questionId).subscribe(question =>
      this.question = question);
  }

  updateQuestion(): void {
    this.questionService.updateQuestion(this.question).subscribe(question => this.question = question);
  }

  createQuestion(question: Question): void {
    this.questionService.createQuestion(question).subscribe(question => this.question = question);
  }
}
