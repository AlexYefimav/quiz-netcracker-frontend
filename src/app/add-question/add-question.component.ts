import {Component, Input, OnInit, Output, ViewChild, EventEmitter} from '@angular/core';
import {Game} from '../model/game';
import {Question} from '../model/question';
import {MatAccordion} from '@angular/material/expansion';
import {QuestionService} from '../service/question.service';
import {GameService} from '../service/game.service';

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

  constructor(private questionService: QuestionService,
              private gameService: GameService) { }

  ngOnInit(): void {
    this.question = new Question();
    this.question.answersSet = [];
    this.question.game = this.game.id;
  }

  async addQuestion() {
    if (this.game.id == null) {
      this.game.questions.push(this.question);
      this.game = await this.createGame();
      this.question = this.game.questions[0];
    }
    else {
      this.question = await this.createQuestion();
      this.game.questions.push(this.question);
    }
    this.gameChange.emit(this.game);
    this.question = new Question();
    this.question.answersSet = [];
    this.question.game = this.game.id;
  }

  createGame(): Promise<Game> {
    return this.gameService.createGame(this.game).toPromise();
  }

  createQuestion(): Promise<Question> {
    return this.questionService.createQuestion(this.question).toPromise();
  }
}
