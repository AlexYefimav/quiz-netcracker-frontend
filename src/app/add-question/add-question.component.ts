import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Game} from '../model/game';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';
import {QuestionService} from '../service/question.service';
import {GameService} from '../service/game.service';
import {FormGroup} from '@angular/forms';
import {AddQuestionValidation} from '../service/validation/add-question-validation';
import {AddAnswerValidation} from '../service/validation/add-answer-validation.service';
import {StorageService} from '../service/storage/storage.service';
import {Router} from '@angular/router';
import {User} from '../model/user';

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
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.checkAuthorized() != undefined) {
      this.initializeProperties();
    } else {
      this.redirect('403');
    }
  }

  redirect(url: string): void {
    this.router.navigate([url]);
  }

  checkAuthorized(): User {
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

  addQuestion(): void {
    if (this.questionForm.valid) {
      if (this.game.id == null) {
        this.game.player = this.storageService.currentUser.id;
      }
      this.question.temporaryIndex = this.game.questions.length + 1;
      this.game.questions.push(this.question);
      this.initializeProperties();
      this.answerForm = this.answerValidation.createAnswerForm();
    }
  }

  initializeProperties(): void {
    this.questionValidation.setGame(this.game);
    this.questionForm = this.questionValidation.createQuestionForm();
    this.question = new Question();
    this.question.answersSet = [];
    this.question.game = this.game.id;
    this.answerValidation.setQuestion(this.question);
  }
}
