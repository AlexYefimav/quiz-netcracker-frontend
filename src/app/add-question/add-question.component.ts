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

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  @Input() game: Game;
  @Output() gameChange = new EventEmitter<Game>();
  question: Question;
  questionForm: FormGroup;
  answerForm: FormGroup;

  constructor(private questionService: QuestionService,
              private gameService: GameService,
              private questionValidation: AddQuestionValidation,
              private answerValidation: AddAnswerValidation,
              private storageService: StorageService) { }

  async ngOnInit(): Promise<void> {
    await this.initializeProperties();
  }

  async addQuestion(): Promise<void> {
    if (this.questionForm.valid) {
      if (this.game.id == null) {
        this.game.questions.push(this.question);
        this.game.player = this.storageService.currentUser.id;
        this.game = await this.createGame();
      }
      else {
        this.question = await this.createQuestion();
        this.game.questions.push(this.question);
      }
      this.gameChange.emit(this.game);
      await this.initializeProperties();
      this.answerForm = this.answerValidation.createAnswerForm();
    }
  }

  createGame(): Promise<Game> {
    return this.gameService.createGame(this.game).toPromise();
  }

  createQuestion(): Promise<Question> {
    return this.questionService.createQuestion(this.question).toPromise();
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
