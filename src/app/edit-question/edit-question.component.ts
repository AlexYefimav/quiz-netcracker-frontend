import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../model/question";
import {ActivatedRoute, Router} from "@angular/router";
import {QuestionService} from "../service/question.service";
import {GameService} from '../service/game.service';
import {Game} from '../model/game';
import {FormGroup} from '@angular/forms';
import {UpdateQuestionValidation} from '../service/validation/update-question-validation';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';
import {AddAnswerValidation} from '../service/validation/add-answer-validation.service';
import {StorageService} from "../service/storage/storage.service";
import {User} from "../model/user";

@Component({
  selector: 'app-edit-question',
  templateUrl: './edit-question.component.html',
  styleUrls: ['./edit-question.component.css']
})
export class EditQuestionComponent implements OnInit {
  @Input() question: Question;
  @Input() game: Game;
  questionForm: FormGroup;
  authorizedAccount: User;
  answerForm: FormGroup;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private  storageService: StorageService,
              private route: ActivatedRoute,
              private router: Router,
              private questionValidation: UpdateQuestionValidation,
              private translateService: TranslateService,
              private localSettingsService: LocalSettingsService,
              private answerValidation: AddAnswerValidation) {
  }

  ngOnInit(): void {
    const currentLanguage = this.localSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    if (this.checkAuthorized() != undefined) {
      this.questionValidation.setGame(this.game);
      this.questionForm = this.questionValidation.createQuestionForm(this.question);
      this.answerValidation.setQuestion(this.question);
      this.answerForm = this.answerValidation.createAnswerForm();
    } else this.redirect('403');
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

  redirect(url: string) {
    this.router.navigate([url]);
  }

  checkAuthorized() {
    if (!StorageService.isEmpty()) {
      if (this.storageService.currentToken) {
        this.authorizedAccount = this.storageService.currentUser;
      } else {
        StorageService.clear();
      }
    } else {
      this.authorizedAccount = undefined;
    }
    return this.authorizedAccount;
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
