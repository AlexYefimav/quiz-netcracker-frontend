import {Component, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {FormGroup} from '@angular/forms';
import {UpdateQuestionValidation} from '../service/validation/update-question-validation';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  question: Question;
  game: Game;
  questionForm: FormGroup;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private questionValidation: UpdateQuestionValidation,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService) {
  }

  async ngOnInit(): Promise<void> {
    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    if (this.route.snapshot.params.gameId != null) {
      this.game = await this.getGame(this.route.snapshot.params.gameId);
      this.questionValidation.setGame(this.game);
      if (this.route.snapshot.params.id != null) {
        this.question = await this.getQuestion(this.route.snapshot.params.id);
        this.questionForm = await this.questionValidation.createQuestionForm(this.question);
      }
    }
  }

  getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  private getQuestion(id: string): Promise<Question> {
    return this.questionService.getQuestionById(id).toPromise();
  }

  updateQuestion(): void {
    if (this.questionForm.valid) {
      this.questionService.updateQuestion(this.question)
        .subscribe(question => this.question = question);
    }
  }
}
