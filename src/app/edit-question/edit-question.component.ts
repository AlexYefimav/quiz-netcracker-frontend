import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";
import {MatAccordion} from '@angular/material/expansion';
import {GameService} from '../service/game.service';
import {Game} from '../model/game';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  question: Question;
  game: Game;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private route: ActivatedRoute) {
  }

  async ngOnInit() {
    if (this.route.snapshot.params.gameId != null) {
      this.game = await this.getGame(this.route.snapshot.params.gameId);
      if (this.route.snapshot.params.id != null) {
        this.getQuestion(this.route.snapshot.params.id);
      }
    }
  }

  getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  private getQuestion(questionId: string): void {
    this.questionService.getQuestionById(questionId).subscribe(question =>
      this.question = question);
    // console.log(this.question.title);
    // console.log(this.question.description);
    // console.log(this.question.category);
    // console.log(this.question.level);
  }

  updateQuestion(): void {
    this.questionService.updateQuestion(this.question)
      .subscribe(question => this.question = question);
  }
}
