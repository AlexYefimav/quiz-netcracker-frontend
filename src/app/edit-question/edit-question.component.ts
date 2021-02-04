import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute} from "@angular/router";
import {QuestionService} from "../service/question.service";
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {FormGroup} from '@angular/forms';
import {UpdateQuestionValidation} from '../service/validation/update-question-validation';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';
import {AddAnswerValidation} from '../service/validation/add-answer-validation.service';

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() game: Game;
  questionForm: FormGroup;
  answerForm: FormGroup;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private route: ActivatedRoute,
              private questionValidation: UpdateQuestionValidation,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService,
              private answerValidation: AddAnswerValidation) {
  }

  async ngOnInit(): Promise<void> {
    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    this.questionValidation.setGame(this.game);
    this.questionForm = await this.questionValidation.createQuestionForm(this.question);
    this.answerValidation.setQuestion(this.question);
    this.answerForm = this.answerValidation.createAnswerForm();
  }

  getTitle(): string {
    return this.questionForm.get('title').value;
  }

  getDescription(): string {
    return this.questionForm.get('description').value;
  }

  getCategory(): string {
    return this.questionForm.get('category').value;
  }

  getLevel(): string {
    return this.questionForm.get('level').value;
  }

  getPhoto(): string {
    return this.questionForm.get('photo').value;
  }

  deleteQuestion(): void {
    const questions = this.game.questions;
    const selectedQuestion = questions.indexOf(this.question);
    if (selectedQuestion !== -1) {
      questions.splice(selectedQuestion, 1);
    }
  }

  updateQuestion(): void {
    if (this.questionForm.valid) {
      this.question.title = this.getTitle();
      this.question.description = this.getDescription();
      this.question.category = this.getCategory();
      this.question.level = this.getLevel();
      this.question.photo = this.getPhoto();
    }
  }
}
