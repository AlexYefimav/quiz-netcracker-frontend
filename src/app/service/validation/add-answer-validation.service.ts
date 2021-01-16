import {Injectable} from '@angular/core';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {Answer} from '../../model/answer';
import {Question} from '../../model/question';

@Injectable({
  providedIn: 'root'
})
export class AddAnswerValidation {
  answerForm: FormGroup;
  question: Question;

  constructor(private formBuilder: FormBuilder) {
  }

  setQuestion(question: Question): void {
    this.question = question;
  }

  createAnswerForm(): FormGroup {
    return this.formBuilder.group({
      title: ['', [Validators.required]],
      right: [false, []]
    }, {validators: this.validate.bind(this)});
  }

  validate(control: AbstractControl): ValidationErrors | null {
    if (control) {
      const title = control.get('title').value;
      const answers = this.question.answersSet;
      answers.forEach(answer => {
          if (answer.title === title) {
            control.get('title')?.setErrors({duplicate: true});
            return { duplicate: true };
          }
      });
    }
    return null;
  }
}
