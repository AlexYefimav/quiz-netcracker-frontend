import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {Answer} from '../model/answer';
import {AbstractControl, FormArray, FormControl, FormGroup, ValidatorFn, Validators} from '@angular/forms';
import {AnswerValidation} from '../service/validation/answer-validation.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  @Input() question: Question;
  answer: Answer;
  right: boolean;
  answerForm: FormGroup;

  constructor(private answerValidation: AnswerValidation) {
  }

  ngOnInit(): void {
    this.answerForm = this.answerValidation.createAnswerForm();
    this.answerValidation.setQuestion(this.question);
    this.right = false;
  }

  addAnswer(): void {
    this.answer = new Answer();
    this.answer.title = this.getTitle();
    this.answer.right = this.right;
    this.answer.question = this.question.id;
    this.question.answersSet.push(this.answer);

    this.right = false;
    this.answerForm = this.answerValidation.createAnswerForm();
  }

  getTitle(): any {
    return this.answerForm.get('title').value;
  }

}
