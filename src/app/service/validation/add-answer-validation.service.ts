import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../model/question';
import {DuplicateValidator} from './duplicate-validation';

@Injectable({
  providedIn: 'root'
})
export class AddAnswerValidation {
  question: Question;

  constructor(private formBuilder: FormBuilder,
              private duplicateValidator: DuplicateValidator) {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  createAnswerForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      right: [false, []]
    }, {validators: this.duplicateValidator.duplicateValidation(this.question?.answersSet)});
  }
}
