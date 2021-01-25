import {Component, OnInit, ViewChild} from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute} from '@angular/router';
import {GameService} from '../service/game.service';
import {MatAccordion} from '@angular/material/expansion';
import {StorageService} from "../service/storage/storage.service";
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {FormGroup} from '@angular/forms';
import {UpdateGameValidation} from '../service/validation/update-game-validation';
import {AddGameValidation} from '../service/validation/add-game-validation';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css']
})
export class AddGameComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  game: Game;
  isUpdateGame: boolean;
  gameForm: FormGroup;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private userService: UserService,
              private storageService: StorageService,
              private addGameValidation: AddGameValidation,
              private updateGameValidation: UpdateGameValidation) {
  }

  async ngOnInit(): Promise<void> {
    if (this.route.snapshot.params.id != null){
      this.game = await this.getGame(this.route.snapshot.params.id);
      this.isUpdateGame = true;
      this.gameForm = this.updateGameValidation.createGameForm(this.game);
    } else {
      this.isUpdateGame = false;
      this.game = new Game();
      this.game.questions = [];
      this.game.id = null;
      this.gameForm = this.addGameValidation.createGameForm();
    }
  }

  private getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  getTitle(): string {
    return this.gameForm.get('title').value;
  }

  getDescription(): string {
    return this.gameForm.get('description').value;
  }

  getUser(id: string): Promise<User> {
    return this.userService.getUserById(id).toPromise();
  }

  createAndGetGame(game: Game): Promise<Game> {
    return this.gameService.createGame(game).toPromise();
  }

  updateAndGetGame(): Promise<Game> {
    return this.gameService.updateGame(this.game).toPromise();
  }

  async updateGame(): Promise<void> {
    if (this.gameForm.valid) {
      this.game = await this.updateAndGetGame();
    }
  }

  async createGame(game: Game): Promise<void> {
    if (this.gameForm.valid) {
      if (game.questions.length === 0) {
        this.game.player = this.storageService.currentUser.id;
        this.game = await this.createAndGetGame(game);
      }
      else {
        this.game = await this.updateAndGetGame();
      }
    }
  }

  checkForm(): void {
    if (this.gameForm.valid) {
      this.game.title = this.getTitle();
      this.game.description = this.getDescription();
    }
  }
}
