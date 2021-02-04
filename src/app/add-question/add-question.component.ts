import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Game} from '../model/game';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';
import {QuestionService} from '../service/question.service';
import {GameService} from '../service/game.service';
import {FormGroup} from '@angular/forms';
import {AddQuestionValidation} from '../service/validation/add-question-validation';
import {AddAnswerValidation} from '../service/validation/add-answer-validation.service';
import {StorageService} from '../service/storage/storage.service';
import {ActivatedRoute, Router} from "@angular/router";
import {UpdateQuestionValidation} from "../service/validation/update-question-validation";
import {TranslateService} from "@ngx-translate/core";
import {LocalSettingsService} from "../service/localization/LocalSettingsService";
import {User} from "../model/user";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() game: Game;
  question: Question;
  questionForm: FormGroup;
  answerForm: FormGroup;
  authorizedAccount: User;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private questionValidation: AddQuestionValidation,
              private answerValidation: AddAnswerValidation,
              private storageService: StorageService,
              private router: Router) { }

  async ngOnInit(): Promise<void> {
    if(this.checkAuthorized()!=undefined) {
    await this.initializeProperties();
    }
    else this.redirect('403');
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

  async addQuestion(): Promise<void> {
    if (this.questionForm.valid) {
      if (this.game.id == null) {
        this.game.player = this.storageService.currentUser.id;
      }
      this.game.questions.push(this.question);
      await this.initializeProperties();
      this.answerForm = this.answerValidation.createAnswerForm();
    }
  }

  async initializeProperties(): Promise<void> {
    this.questionValidation.setGame(this.game);
    this.questionForm = await this.questionValidation.createQuestionForm();
    this.question = new Question();
    this.question.answersSet = [];
    this.question.game = this.game.id;
    this.answerValidation.setQuestion(this.question);
  }
}
