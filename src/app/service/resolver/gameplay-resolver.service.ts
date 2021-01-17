import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from "@angular/router";
import {QuestionService} from "../question.service";
import {Question} from "../../model/question";

@Injectable({
  providedIn: 'root',
})
export class GameplayResolverService implements Resolve<Question[]> {

  constructor(private questionService: QuestionService) {
  }

  resolve(route: ActivatedRouteSnapshot){
    return this.questionService.getQuestionByGameid(route.paramMap.get('id'));
  }
}
