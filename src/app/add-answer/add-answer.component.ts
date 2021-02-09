import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {Answer} from '../model/answer';
import {FormGroup} from '@angular/forms';
import {AddAnswerValidation} from '../service/validation/add-answer-validation.service';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  @Input() question: Question;
  answer: Answer;
  @Input() answerForm: FormGroup;

  constructor(private answerValidation: AddAnswerValidation) {
  }

  ngOnInit(): void {
    this.answerValidation.setQuestion(this.question);
    this.answerForm = this.answerValidation.createAnswerForm();
    console.log(this.answerForm);
  }

  addAnswer(): void {
    console.log(this.answerForm);
    if (this.answerForm.valid) {
      // console.log(this.answerForm);
      this.answer = new Answer();
      this.answer.title = this.getTitle();
      this.answer.right = this.isRight();
      this.answer.question = this.question.id;
      this.answer.temporaryIndex = this.question.answersSet.length + 1;
      this.question.answersSet.push(this.answer);

      this.answerValidation.setQuestion(this.question);
      this.answerForm = this.answerValidation.createAnswerForm();
    }
  }

  getTitle(): string {
    return this.answerForm.get('title').value;
  }

  isRight(): boolean {
    return this.answerForm.get('right').value;
  }
}
