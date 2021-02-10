import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';
import {Question} from '../model/question';
import {FormGroup} from '@angular/forms';
import {UpdateAnswerValidation} from '../service/validation/update-answer-validation';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  @Input() answer: Answer;
  @Input() question: Question;
  answerForm: FormGroup;

  constructor(private answerService: AnswerService,
              private answerValidation: UpdateAnswerValidation) {
  }

  ngOnInit(): void {
    this.answerValidation.setQuestion(this.question);
    this.answerForm = this.answerValidation.createAnswerForm(this.answer);
  }

  deleteAnswer(): void {
    const answers = this.question.answersSet;
    const chosenAnswerIndex = answers.indexOf(this.answer);
    if (chosenAnswerIndex !== -1) {
      answers.splice(chosenAnswerIndex, 1);
    }
  }

  updateAnswer(): void {
    if (this.answerForm.valid) {
      this.answer.title = this.getTitle();
      this.answer.right = this.isRight();
    } else {
      this.answerForm.get('title').patchValue(this.answer.title);
      this.answerForm.get('right').patchValue(this.answer.right);
    }
  }

  getTitle(): string {
    return this.answerForm.get('title').value;
  }

  isRight(): boolean {
    return this.answerForm.get('right').value;
  }
}
