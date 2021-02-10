import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Game} from '../model/game';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../service/game.service';
import {MatAccordion} from '@angular/material/expansion';
import {StorageService} from '../service/storage/storage.service';
import {UserService} from '../service/user.service';
import {User} from '../model/user';
import {AbstractControl, FormGroup} from '@angular/forms';
import {UpdateGameValidation} from '../service/validation/update-game-validation';
import {AddGameValidation} from '../service/validation/add-game-validation';
import {CategoryService} from '../service/category.service';
import {LevelService} from '../service/level.service';
import {Category} from '../model/category';
import {Level} from '../model/level';
import {PhotoService} from '../service/photo.service';
import {PlayerService} from '../service/player.service';

@Component({
  selector: 'app-add-game',
  templateUrl: './add-game.component.html',
  styleUrls: ['./add-game.component.css', '../app.component.css']
})

export class AddGameComponent implements OnInit {
  @ViewChild(MatAccordion) accordion: MatAccordion;
  game: Game;
  isUpdateGame: boolean;
  @Input() gameForm: FormGroup;
  picture: any;
  selectedAccess = 'PUBLIC';
  accesses: string[] = ['PUBLIC', 'PRIVATE'];
  authorizedAccount: User;
  @Input() accessControl: AbstractControl;
  @Output() accessControlChange = new EventEmitter<AbstractControl>();
  categories: Category[] = [];
  levels: Level[] = [];
  isLoading = true;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private userService: UserService,
              private storageService: StorageService,
              private addGameValidation: AddGameValidation,
              private updateGameValidation: UpdateGameValidation,
              private router: Router,
              private categoryService: CategoryService,
              private levelService: LevelService,
              private photoService: PhotoService,
              private playerService: PlayerService) {
  }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(categories => {
      this.categories = categories;
      this.levelService.getLevels().subscribe(levels => {
        this.levels = levels;
        if (this.checkAuthorized() != undefined) {
          if (this.route.snapshot.params.gameId != null) {
            this.gameService.getGameById(this.route.snapshot.params.gameId).subscribe(game => {
              this.game = game;
              this.isUpdateGame = true;
              this.gameForm = this.updateGameValidation.createGameForm(this.game);
              this.isLoading = false;
            });
          } else {
            this.isUpdateGame = false;
            this.game = new Game();
            this.game.questions = [];
            this.gameForm = this.addGameValidation.createGameForm();
            this.isLoading = false;
          }
        } else {
          this.redirect('403');
        }
      })
    })
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

  getTitle(): string {
    return this.gameForm.get('title').value;
  }

  getDescription(): string {
    return this.gameForm.get('description').value;
  }

  setSelectedAccess(access): void {
    this.game.access = access;
    this.selectedAccess = access;
  }

  getSelectedAccess(access): string {
    if (access) {
      this.selectedAccess = access;
      return access;
    } else {
      this.selectedAccess = 'PUBLIC';
      return 'PUBLIC';
    }
  }

  getPhoto(): string {
    return this.gameForm.get('photo').value;
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

  updateGame(): void {
    this.isLoading = true;
    if (this.gameForm.valid) {
      this.setCategoryIdByName();
      this.setLevelIdByName();
      try {
        this.game.access = this.selectedAccess;
        this.gameService.updateGame(this.game).subscribe(game => {
          this.game = game;
          this.redirectTo('player/' + this.authorizedAccount.player);
        });
      } catch (error) {
        window.setTimeout(() => {
        }, 10000);
      }
    }

  }

  createGame(game: Game): void {
    this.isLoading = true;
    if (this.gameForm.valid) {
      this.setCategoryIdByName();
      this.setLevelIdByName();
      try {
        if (game.id) {
          this.game.access = this.selectedAccess;
          this.gameService.updateGame(this.game).subscribe(game => {
            this.game = game;
            this.redirectTo('player/' + this.authorizedAccount.player);
          });
        } else {
          let player;
          this.playerService.getPlayerByUserId(this.storageService.currentUser.id).subscribe(p => {
            player = p;
            this.game.player = player.id;
            this.game.access = this.selectedAccess;
            this.gameService.createGame(game).subscribe(game => {
              this.game = game;
              this.redirectTo('player/' + this.authorizedAccount.player);
            });
          });
        }
      } catch (error) {
        window.setTimeout(() => {
        }, 10000);
      }
    }
  }

  checkForm(): void {
    if (this.gameForm.valid) {
      this.game.title = this.getTitle();
      this.game.description = this.getDescription();
      this.game.access = this.selectedAccess;
      this.game.photo = this.getPhoto();
    }
  }

  selectFile(event): void {
    this.picture = event.target.files[0];
    const formData = new FormData();
    formData.append('file', this.picture);
    this.photoService.uploadFile(formData).subscribe((result) => {
      this.game.photo = result.photo;
      this.gameForm.get('photo').patchValue(this.picture.login);
    });
  }
}

