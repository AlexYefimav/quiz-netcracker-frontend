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
  chosenAnswer: Answer;

  constructor(private formBuilder: FormBuilder,
              private duplicateValidator: DuplicateValidator) {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  setChosenAnswer(answer: Answer): void {
    this.chosenAnswer = answer;
  }

  createAnswerForm(): FormGroup {
    console.log(this.chosenAnswer);
    return this.formBuilder.group({
      title: [this.chosenAnswer.title, [Validators.required]],
      right: [this.chosenAnswer.right, []]
    }, { validators: this.duplicateValidator.duplicateValidation(this.question.answersSet, this.chosenAnswer) });
  }
}
