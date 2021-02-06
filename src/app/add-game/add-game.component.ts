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
import {CategoryService} from '../service/category.service';
import {LevelService} from '../service/level.service';
import {Category} from '../model/category';
import {Level} from '../model/level';

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
  authorizedAccount: User;
  @Input() accessControl: AbstractControl;
  @Output() accessControlChange = new EventEmitter<AbstractControl>();
  categories: Category[];
  levels: Level[];

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private userService: UserService,
              private storageService: StorageService,
              private addGameValidation: AddGameValidation,
              private updateGameValidation: UpdateGameValidation,
              private translateService: TranslateService,
              private localeSettingsService: LocalSettingsService,
              private router: Router,
              private categoryService: CategoryService,
              private levelService: LevelService) {
  }

  async ngOnInit(): Promise<void> {
    const currentLanguage = this.localeSettingsService.getLanguage();
    this.translateService.use(currentLanguage);
    this.categories = await this.getCategories();
    this.levels = await this.getLevels();
    this.translateService.use(currentLanguage)
    if(this.checkAuthorized()!=undefined) {
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

  private getGame(gameId: string): Promise<Game> {
    return this.gameService.getGameById(gameId).toPromise();
  }

  getCategories(): Promise<Category[]> {
    return this.categoryService.getCategories().toPromise();
  }

  getLevels(): Promise<Level[]> {
    return this.levelService.getLevels().toPromise();
  }

  getTitle(): string {
    return this.gameForm.get('title').value;
  }

  getDescription(): string {
    return this.gameForm.get('description').value;
  }

  setSelectedAccess(access){
    this.game.access=access
      this.selectedAccess = access;
    window.alert(access);
  }

  getSelectedAccess(access): string {
    if(access) {
      this.selectedAccess = access;
      return access;
    }
    else {
      this.selectedAccess = "PUBLIC";
      return "PUBLIC";
    }
  }

  getUser(id: string): Promise<User> {
    return this.userService.getUserById(id).toPromise();
  }

  createAndGetGame(game: Game): Promise<Game> {
    this.game.access=this.selectedAccess;
    return this.gameService.createGame(game).toPromise();
  }

  updateAndGetGame(): Promise<Game> {
    this.game.access=this.selectedAccess;
   // window.alert(this.selectedAccess)
    return this.gameService.updateGame(this.game).toPromise();
  }

  redirectTo(uri: string): void {
    this.router.navigate([uri]);
  }

  setCategoryIdByName(): void {
    for (const question of this.game.questions) {
      for (const category of this.categories) {
        if (category.title === question.category) {
          question.category = category.id;
          break;
        }
      }
    }
  }

  setLevelIdByName(): void {
    for (const question of this.game.questions) {
      for (const level of this.levels) {
        if (level.title === question.level) {
          question.level = level.id;
          break;
        }
      }
    }
  }

  async updateGame(): Promise<void> {
    if (this.gameForm.valid) {
      this.setCategoryIdByName();
      this.setLevelIdByName();
      try {
        this.game = await this.updateAndGetGame();
      }
      catch (error) {
        window.setTimeout(() => {}, 10000);
      }
    }
    this.redirectTo('player/'+this.authorizedAccount.player);
  }

  async createGame(game: Game): Promise<void> {
    if (this.gameForm.valid) {
      this.setCategoryIdByName();
      this.setLevelIdByName();
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
    this.redirectTo('player/'+this.authorizedAccount.player);
  }

  checkForm(): void {
    if (this.gameForm.valid) {
      this.game.title = this.getTitle();
      this.game.description = this.getDescription();
      this.game.access =  this.selectedAccess;
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

