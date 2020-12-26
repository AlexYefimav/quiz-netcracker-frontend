import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../model/question';
import {Answer} from '../model/answer';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-add-answer',
  templateUrl: './add-answer.component.html',
  styleUrls: ['./add-answer.component.css']
})
export class AddAnswerComponent implements OnInit {
  @Input() question: Question;
  title: string;
  right: boolean;
  answerForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    if (this.question.answersSet === undefined) {
      this.question.answersSet = [];
    }

    this.answerForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        this.isDuplicate
      ])
    });
  }

  isDuplicate(control: AbstractControl): { duplicate: boolean } {
    const answers = this.question.answersSet;
    let isDuplicated = false;
    answers.forEach(answer => {
      if (answer.title === this.title) {
        isDuplicated = true;
      }
    });
    return isDuplicated ? { duplicate: true } : { duplicate: false };
  }

  addAnswer(): void {
    const answer = new Answer();
    answer.title = this.title;
    answer.right = this.right;
    this.question.answersSet.push(answer);
    this.title = '';
  }

}
