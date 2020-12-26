import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';
import {Question} from '../model/question';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  @Input() answer: Answer;
  @Input() question: Question;

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
  }

  deleteAnswer(chosenAnswer: Answer): void {
    const answers = this.question.answersSet;
    const chosenAnswerIndex = answers.indexOf(chosenAnswer);
    if (chosenAnswerIndex !== -1) {
      answers.splice(chosenAnswerIndex, 1);
    }
    this.answerService.deleteAnswer(chosenAnswer).subscribe();
  }

  updateAnswer(answer: Answer): void {
    this.answerService.updateAnswer(answer).subscribe();
  }

}
