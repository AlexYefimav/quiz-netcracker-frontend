import {Component, Input, OnInit} from '@angular/core';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';

@Component({
  selector: 'app-answer-detail',
  templateUrl: './answer-detail.component.html',
  styleUrls: ['./answer-detail.component.css']
})
export class AnswerDetailComponent implements OnInit {
  @Input() answer: Answer;

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
  }

  deleteAnswer(answer: Answer): void {
    this.answerService.deleteAnswer(answer).subscribe();
  }

  updateAnswer(answer: Answer): void {
    this.answerService.updateAnswer(answer).subscribe();
  }

}
