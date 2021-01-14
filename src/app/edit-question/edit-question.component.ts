import {Component, Input, OnInit, ViewChild} from '@angular/core';
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
  @Input() question: Question;
  isUpdateQuestion: boolean;
  disable: string;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute) {
  }

  ngOnInit() {
    if (this.route.snapshot.params.id != null) {
      this.isUpdateQuestion = true;
      this.getQuestion(this.route.snapshot.params.id);
    } else {
      this.isUpdateQuestion = false;
      this.question = new Question();
    }
  }

  isDisable(): string {
    if (this.question.title != null && this.question.title != "" &&
      this.question.description != null && this.question.description != "" &&
      this.question.category != null && this.question.level != null) {
      this.disable = "false";
    } else {
      this.disable = "disable"
    }
    return this.disable;
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
