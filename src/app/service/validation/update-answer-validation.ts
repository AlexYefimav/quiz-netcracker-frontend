import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Question} from '../../model/question';
import {Answer} from '../../model/answer';
import {DuplicateValidator} from './duplicate-validation';

@Injectable({
  providedIn: 'root'
})
export class UpdateAnswerValidation {
  answerForm: FormGroup;
  question: Question;

  constructor(private formBuilder: FormBuilder,
              private duplicateValidator: DuplicateValidator) {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  createAnswerForm(answer: Answer): FormGroup {
    return this.formBuilder.group({
      title: [answer.title, [Validators.required]],
      right: [answer.right, []]
    }, { validators: this.duplicateValidator.duplicateValidation(this.question.answersSet, answer) });
  }
}
