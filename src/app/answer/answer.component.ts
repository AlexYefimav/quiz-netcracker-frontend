import { Component, OnInit } from '@angular/core';
import {Answer} from '../model/answer';
import {AnswerService} from '../service/answer.service';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  public answers: Answer[];

  constructor(private answerService: AnswerService) { }

  ngOnInit(): void {
    this.getAnswers();
  }

  private getAnswers(): void {
    this.answerService.getAnswers()
      .subscribe(answers => {
        this.answers = answers;
      });
  }

}
