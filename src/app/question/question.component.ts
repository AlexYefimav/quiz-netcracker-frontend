import { Component, OnInit } from '@angular/core';
import {QuestionService} from "../service/question.service";
import {Wrapper} from "../model/wrapper";
import {Question} from "../model/question";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.css']
})
export class QuestionComponent implements OnInit {
  public questions: Question[];


  constructor(private questionService: QuestionService ) { }

  ngOnInit(): void{
    this.getQuestionList();
  }

private getQuestionList(): void {
    this.questionService.getQuestion().subscribe(wrapper => {
      this.questions = wrapper.values;
    })
}

}
