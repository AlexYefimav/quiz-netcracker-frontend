import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../service/game.service';
import {MatAccordion} from '@angular/material/expansion';
import {StorageService} from "../service/storage/storage.service";
import {UserService} from "../service/user.service";
import {User} from "../model/user";
import {AbstractControl, FormGroup} from '@angular/forms';
import {UpdateGameValidation} from '../service/validation/update-game-validation';
import {AddGameValidation} from '../service/validation/add-game-validation';
import {TranslateService} from '@ngx-translate/core';
import {LocalSettingsService} from '../service/localization/LocalSettingsService';

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
  picture: any;
  fileUrl: string;
  selectedAccess: string="PUBLIC";
  accesses: string[] = ["PUBLIC", "PRIVATE"];
  @Input() accessControl: AbstractControl;
  @Output() accessControlChange = new EventEmitter<AbstractControl>();

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private userService: UserService,
              private storageService: StorageService,
              private addGameValidation: AddGameValidation,
              private updateGameValidation: UpdateGameValidation,
              private translateService: TranslateService,
              private localeSettingsService: LocalSettingsService,
              private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    const currentLanguage = this.localeSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    if (this.route.snapshot.params.id != null){
      this.game = await this.getGame(this.route.snapshot.params.id);
      this.isUpdateGame = true;
      this.gameForm = this.updateGameValidation.createGameForm(this.game);
    } else {
      this.isUpdateGame = false;
      this.game = new Game();
      this.game.questions = [];
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

  setSelectedAccess(access){
    this.selectedAccess=access;
  }
  
  getAccess(): string {
    for (let access of this.accesses) {
     // access="PRIVATE";
      if (this.accessControl.value === access) {
        this.game.access = access;
        return access;
      }
    }
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

  redirectTo(uri: string): void {
    this.router.navigateByUrl('/games', {skipLocationChange: true}).then(() =>
      this.router.navigate([uri]));
  }

  async updateGame(): Promise<void> {
    if (this.gameForm.valid) {
      try {
        this.game = await this.updateAndGetGame();
      }
      catch (error) {
        window.setTimeout(() => {}, 10000);
      }
    }
    this.redirectTo('games');
  }

  async createGame(game: Game): Promise<void> {
    if (this.gameForm.valid) {
      try {
        if (game.id) {
          this.game = await this.updateAndGetGame();
        }
        else {
          this.game.player = this.storageService.currentUser.id;
          this.game = await this.createAndGetGame(game);
        }
      }
      catch (error) {
        window.setTimeout(() => {}, 10000);
      }
    }
    this.redirectTo('games');
  }

  checkForm(): void {
    if (this.gameForm.valid) {
      this.game.title = this.getTitle();
      this.game.description = this.getDescription();
      this.game.access =  this.selectedAccess;
       //  this.game.access = "PUBLIC";
    }
 }
  selectFile(event) {
    this.picture = event.target.files[0];
    const formData = new FormData();
    const formData2 = new FormData();
    formData.append('file', this.picture);
    this.gameService.uploadFile(formData).subscribe((result) =>
      {
        this.fileUrl = result.photo;
        formData2.append('url', this.fileUrl);
        formData2.append('gameId', this.game.id);
        this.gameService.updateFile(this.game.id, formData2).subscribe((res: Game) =>
          {
            this.game.photo = res.photo;
          },
          err => console.error('Observer got an error: ' + err)
        );
      },
      err => console.error('Observer got an error: ' + err)
    );
  }
}

