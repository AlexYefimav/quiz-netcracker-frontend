import {Component, Input, OnInit} from '@angular/core';
import {Question} from '../model/question';

@Component({
  selector: 'app-answer',
  templateUrl: './answer.component.html',
  styleUrls: ['./answer.component.css']
})
export class AnswerComponent implements OnInit {
  @Input() question: Question;

  constructor() { }

  ngOnInit(): void {
  }
}
