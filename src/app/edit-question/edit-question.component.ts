import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";
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
        this.question = await this.getQuestion(this.route.snapshot.params.id);
      }
    }
  }

  getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  private getQuestion(id: string): Promise<Question> {
    return this.questionService.getQuestionById(id).toPromise();
  }

  async updateQuestion() {
    this.question = await this.questionService.updateQuestion(this.question).toPromise();
  }
}
