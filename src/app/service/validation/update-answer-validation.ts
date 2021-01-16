import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Question} from '../../model/question';
import {Answer} from '../../model/answer';

@Injectable({
  providedIn: 'root'
})
export class UpdateAnswerValidation {
  answerForm: FormGroup;
  question: Question;
  chosenAnswer: Answer;

  constructor(private formBuilder: FormBuilder) {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  setChosenAnswer(answer: Answer): void {
    this.chosenAnswer = answer;
  }

  createAnswerForm(): FormGroup {
    return this.formBuilder.group({
      title: [this.chosenAnswer.title, [Validators.required]],
      right: [this.chosenAnswer.right, []]
    }, {validators: this.validate.bind(this)});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control) {
      const title = control.get('title').value;
      const answers = this.question.answersSet;
      answers.forEach(answer => {
        if (answer.title === title && answer !== this.chosenAnswer) {
          control.get('title')?.setErrors({duplicate: true});
          return { duplicate: true };
        }
      });
    }
    return null;
  }
}
