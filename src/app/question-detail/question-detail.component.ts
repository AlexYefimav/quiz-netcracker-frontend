import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';

@Component({
  selector: 'app-question-detail',
  templateUrl: './question-detail.component.html',
  styleUrls: ['./question-detail.component.css']
})
export class QuestionDetailComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() question: Question;
  @Output() questionChange = new EventEmitter<Question>();

  constructor() { }

  ngOnInit(): void {
  }

}
