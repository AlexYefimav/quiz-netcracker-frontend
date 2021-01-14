import {Injectable} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Question} from '../../model/question';
// import {DuplicateAnswerValidator} from './duplicate-answer';

@Injectable({
  providedIn: 'root'
})
export class AnswerValidation {
  answerForm: FormGroup;
  question: Question;

  constructor() {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  createAnswerForm(): FormGroup {
    return new FormGroup({
      title: new FormControl('', [
        Validators.required,
        this.DuplicateAnswerValidator
      ])
    });
  }

  DuplicateAnswerValidator(control: FormControl) {
    // const answers = this.question.answersSet;
    const answers = [];
    answers.forEach(answer => {
      if (answer.title === control.value) {
        return {
          duplicate: true
        };
      }
    });
    return null;
  }
}
