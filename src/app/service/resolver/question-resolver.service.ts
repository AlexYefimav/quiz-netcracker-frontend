import {Injectable} from '@angular/core';
import {Resolve} from "@angular/router";
import {QuestionService} from "../question.service";

@Injectable({
  providedIn: 'root',
})
export class QuestionResolverService implements Resolve<any> {

  constructor(private questionService: QuestionService) {
  }

  resolve(){
    return this.questionService.getQuestion();
  }
}
